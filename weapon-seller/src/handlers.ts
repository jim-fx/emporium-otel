import { Context } from "hono";
import * as db from "./db/db.ts";

export async function listItems(c: Context) {
  const products = await db.listProducts();
  return c.json({
    items: products,
  });
}
