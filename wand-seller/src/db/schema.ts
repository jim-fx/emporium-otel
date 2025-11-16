import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  name: text("name"),
  type: text("type"),
  rarity: text("rarity"),
  price: integer("price"),
  description: text("description"),
});
