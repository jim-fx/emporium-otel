import OpenAI from "@openai/openai";

interface Product {
  name: string;
  type: string;
  rarity: string;
  price: number;
  description: string;
}

async function main() {
  const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
  if (!openaiApiKey) {
    console.error("OPENAI_API_KEY environment variable is not set.");
    Deno.exit(1);
  }

  const openai = new OpenAI({
    apiKey: openaiApiKey,
  });

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

    const fileName = `${outputDir}/${product.name}.png`;

    console.log(`Generating image for "${product.name}"...`);

    try {
      // Create a response with image generation tool enabled
      const response = await openai.responses.create({
        model: "gpt-4o",
        input: prompt,
        tools: [{ type: "image_generation" }],
      });

      // Extract image generation calls from the response
      const imageGenerationCalls = response.output.filter(
        (output) => output.type === "image_generation_call",
      );

      if (imageGenerationCalls.length === 0) {
        throw new Error("No image was generated in the response");
      }

      // Get the first generated image
      const imageCall = imageGenerationCalls[0];
      const imageBase64 = imageCall.result;
      const revisedPrompt = imageCall.revised_prompt;

      console.log("Image generated successfully!");
      if (revisedPrompt) {
        console.log(`Revised prompt: ${revisedPrompt}`);
      }

      if (fileName) {
        await Deno.writeFile(
          fileName,
          new Uint8Array(
            atob(imageBase64)
              .split("")
              .map((c) => c.charCodeAt(0)),
          ),
        );
        filePath = outputPath;
        console.log(`Image saved to: ${outputPath}`);
      }

      return {
        imageBase64,
        revisedPrompt,
        filePath,
      };
    } catch (error) {
      console.error("Error generating image:", error);
      throw error;
    }
  }
  console.log("Image generation complete.");
}

main();

