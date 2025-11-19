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
      description TEXT,
      quantity    INTEGER      NOT NULL DEFAULT 1
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

    const amount: Record<string, number> = {
      "legendary": 5,
      "epic": 10,
      "rare": 20,
      "common": 40,
    };

    const quantity = Math.floor(
      (Math.random() * amount[product.rarity]) + amount[product.rarity] / 10,
    );

    await sql`
      INSERT INTO products (name, type, rarity, price, image, description, quantity)
      VALUES (
        ${product.name},
        ${product.type},
        ${product.rarity},
        ${product.price},
        ${imageUrl},
        ${product.description},
        ${quantity}
      );
    `;
  }

  await sql.end({ timeout: 5 });
}

main().catch((err) => {
  console.error(err);
  Deno.exit(1);
});
