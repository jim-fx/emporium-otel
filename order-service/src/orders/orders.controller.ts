import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from "@nestjs/common";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { CreateOrderDto } from "./dto/create-order.dto";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Product } from "src/entities/Products";
import { EntityRepository } from "@mikro-orm/core";
import { Order } from "src/entities/Orders";
import { randomUUID } from "crypto";

@Controller("orders")
export class OrdersController {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @InjectRepository(Product) private readonly productRepository:
      EntityRepository<Product>,
    @InjectRepository(Order) private readonly orderRepository: EntityRepository<
      Order
    >,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const products = await this.productRepository.find({
      id: {
        $in: createOrderDto.products.map((product) => product.id),
      },
    });

    const productMap = new Map<string, Product>();
    for (const product of products) {
      productMap.set(product.id, product);
    }

    for (
      const { id: productId, quantity: orderQuantity } of createOrderDto
        .products
    ) {
      const product = productMap.get(productId);
      if (!product) {
        throw new HttpException(`Product not found ${productId}`, 404);
      }

      if (orderQuantity > product.quantity) {
        throw new HttpException("Quantity exceeds product quantity", 400);
      }

      product.quantity -= orderQuantity;
    }

    const order = new Order();
    order.id = randomUUID();
    order.userId = createOrderDto.user_id;
    order.products = createOrderDto.products;
    order.createdAt = new Date();
    order.totalPrice = createOrderDto.total_price;

    await this.orderRepository.insert(order);

    // Update the products quantities
    for (const [_, product] of productMap) {
      this.productRepository.upsert(product);
    }

    this.amqpConnection.publish("", "order_queue", createOrderDto);
    return { message: "Order received and is being processed." };
  }

  @Get("user/:userId")
  async getOrdersByUserId(
    @Param("userId") userId: string,
  ) {
    const orders = await this.orderRepository.find({ userId });
    return orders;
  }
}
