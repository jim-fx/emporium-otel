import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ProductDetailDto } from "src/orders/dto/create-order.dto";

@Entity({
  tableName: "orders",
})
export class Order {
  @PrimaryKey()
  id: string;

  @Property()
  userId: string;

  @Property({ type: "json" })
  products: ProductDetailDto[];

  @Property()
  totalPrice: number;

  @Property()
  createdAt: Date;
}
