interface Product {
  name: string;
  type: string;
  rarity: string;
  price: number;
  description: string;
}

async function main() {
  const productsJson = await Deno.readTextFile("./products.json");
  const products: Product[] = JSON.parse(productsJson);

  const outputDir = "./output";
  await Deno.mkdir(outputDir, { recursive: true });

  for (const product of products) {
    const prompt = `
      Generate me a product image.
      black background, product image, slightly stylized, volumetric lighting, fantasy item
      rarity: ${product.rarity}
      The item you are photographing: ${product.name}
      The description ${product.description}
    `;

    console.log(prompt);
    console.log("--------------------");
    continue;
  }
  console.log("Image generation complete.");
}

main();
