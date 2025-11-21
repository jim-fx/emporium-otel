import { Context } from "hono";
import * as db from "./db/db.ts";
import { trace } from "@opentelemetry/api";

export async function listProducts(c: Context) {
  return c.json({
    products: await db.listProducts(),
  });
}

export async function getProduct(c: Context) {
  const span = trace.getActiveSpan();
  span.setAttribute("productName", c.req.param("productName"));
  const productId = c.req.param("productId");
  const product = await db.getProduct(productId);
  if (!product?.length) {
    return c.json({ message: "Product not found" }, 404);
  }
  return c.json(product[0]);
}
