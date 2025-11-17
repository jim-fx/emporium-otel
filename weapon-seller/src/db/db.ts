import { drizzle } from "drizzle-orm/node-postgres";
import { products as productSchema } from "./schema.ts";
import pg from "pg";
import { eq } from "drizzle-orm";

// Use pg driver.
const { Pool } = pg;

export const db = drizzle({
  client: new Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }),
  schema: { productSchema },
});

export function listProducts() {
  return db
    .select()
    .from(productSchema)
    .where(eq(productSchema.type, "weapon"));
}
