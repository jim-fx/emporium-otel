import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({
  tableName: "products"
})
export class Product {
  @PrimaryKey()
  id: string;

  @Property()
  name: string;

  @Property()
  type: string;

  @Property()
  rarity: string;

  @Property()
  price: number;

  @Property()
  image: string;

  @Property()
  description: string;

  @Property()
  quantity: number;
}
