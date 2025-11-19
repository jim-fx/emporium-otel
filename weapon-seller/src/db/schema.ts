import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text("id"),
  name: text("name"),
  type: text("type"),
  rarity: text("rarity"),
  price: integer("price"),
  image: text("image"),
  description: text("description"),
  quantity: integer("quantity"),
});
