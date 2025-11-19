import { Hono } from "hono";
import * as handlers from "./handlers.ts";

export function registerRoutes(app: Hono) {
  app.get("/products", handlers.listProducts);
}
