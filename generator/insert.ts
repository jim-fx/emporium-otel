import postgres from "npm:postgres";

interface Product {
  name: string;
  type: string;
  rarity: string;
  price: number;
  description: string;
}

const sql = postgres({
  host: "localhost", // "host" is the option postgres() expects
  port: 5432,
  database: "app",
  username: "postgres",
  password: "postgres",
});

async function main() {
  // setup product table
  await sql`DROP TABLE products;`;
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

  const productsJson = await Deno.readTextFile("./products.json");
  const products: Product[] = JSON.parse(productsJson);

  for (const product of products) {
    const imageUrl = `http://localhost:8080/products/${product.name}.png`;

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
