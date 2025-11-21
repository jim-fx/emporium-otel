import { drizzle } from "drizzle-orm/node-postgres";
import { products as productSchema } from "./schema.ts";
import pg from "pg";
import { and, eq } from "drizzle-orm";
import { instrumentDrizzleClient } from "@kubiks/otel-drizzle";

// Use pg driver.
const { Pool } = pg;

export const db = drizzle({
  client: new Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }),
  schema: { productSchema },
});

instrumentDrizzleClient(db);

export function listProducts() {
  return db
    .select()
    .from(productSchema)
    .where(eq(productSchema.type, "weapon"));
}

export function getProduct(productName: string) {
  return db
    .select()
    .from(productSchema)
    .where(
      and(
        eq(productSchema.type, "weapon"),
        eq(productSchema.name, productName),
      ),
    );
}
