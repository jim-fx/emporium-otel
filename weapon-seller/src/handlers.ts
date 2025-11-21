import { Context } from "hono";
import * as db from "./db/db.ts";

export async function listProducts(c: Context) {
  return c.json({
    products: await db.listProducts(),
  });
}

export async function getProduct(c: Context) {
  const productId = c.req.param("productId");
  const product = await db.getProduct(productId);
  return c.json(product);
}
