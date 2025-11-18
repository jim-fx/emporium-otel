import { Controller, Post, Body } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    console.log('Received order:', createOrderDto);
    this.amqpConnection.publish(
      'order_exchange', // Exchange name
      'order_routing_key', // Routing key
      createOrderDto,
    );
    return { message: 'Order received and is being processed.' };
  }
}
