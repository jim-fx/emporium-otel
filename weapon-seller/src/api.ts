import { Hono } from "hono";
import * as handlers from "./handlers.ts";
import { trace } from "@opentelemetry/api";

export function registerRoutes(app: Hono) {
  app.get("/products", handlers.listProducts);
  app.get("/products/:productId", handlers.getProduct);
}
