import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({
  tableName: "orders",
})
export class Order {
  @PrimaryKey()
  id: string;

  @Property()
  userId: string;

  @Property()
  products: string[];

  @Property()
  totalPrice: number;

  @Property()
  createdAt: Date;

  @Property()
  updatedAt: Date;
}
