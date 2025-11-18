import postgres from "postgres";

interface Product {
  name: string;
  type: string;
  rarity: string;
  price: number;
  description: string;
}

const sql = postgres({
  host: "db", // "host" is the option postgres() expects
  port: 5432,
  database: "app",
  username: "postgres",
  password: "postgres",
});

async function main() {
  // setup product table
  await sql`DROP TABLE IF EXISTS products;`;
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
      name        VARCHAR(255) NOT NULL,
      type        VARCHAR(50)  NOT NULL,
      rarity      VARCHAR(50)  NOT NULL,
      price       INTEGER      NOT NULL,
      image       VARCHAR(255) NOT NULL,
      description TEXT
    );
  `;

  // setup order table
  await sql`DROP TABLE IF EXISTS orders;`;
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id     VARCHAR(255) NOT NULL,
      products    JSONB        NOT NULL,
      total_price INTEGER      NOT NULL,
      created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
    );
  `;

  const productsJson = await Deno.readTextFile("./products.json");
  const products: Product[] = JSON.parse(productsJson);

  for (const product of products) {
    const imageUrl = `http://localhost:8080/products/${product.name}.webp`;

    await sql`
      INSERT INTO products (name, type, rarity, price, image, description)
      VALUES (
        ${product.name},
        ${product.type},
        ${product.rarity},
        ${product.price},
        ${imageUrl},
        ${product.description}
      );
    `;
  }

  await sql.end({ timeout: 5 });
}

main().catch((err) => {
  console.error(err);
  Deno.exit(1);
});
