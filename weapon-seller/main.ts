import { Hono } from "hono";
import { registerRoutes } from "./src/api.ts";
import { trace } from "@opentelemetry/api";

const app = new Hono();

registerRoutes(app);

app.use(async (c, next) => {
  const span = trace.getActiveSpan();
  span?.updateName(`${c.req.method} ${c.req.url}`);
  span?.setAttribute("http.route", c.req.url);
  span?.setAttribute("http.method", c.req.method);
  await next();
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

Deno.serve(
  { port: 80 },
  app.fetch,
);
