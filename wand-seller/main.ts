import { Hono } from "hono";
import { registerRoutes } from "./src/api.ts";

const app = new Hono();

registerRoutes(app);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

Deno.serve(
  { port: 8081 },
  app.fetch,
);
