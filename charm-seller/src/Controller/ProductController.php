<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class ProductController extends AbstractController
{
    public function __construct(private readonly ProductRepository $productRepository)
    {
    }

    #[Route('/products', name: 'get_products', methods: ['GET'])]
    public function getProducts(Request $request): JsonResponse
    {
        $limit = $request->query->getInt('limit', 20);
        $offset = $request->query->getInt('offset', 0);

        $products = $this->productRepository->findBy(['type' => 'charm'], null, $limit, $offset);
        $total = $this->productRepository->count(['type' => 'charm']);

        return $this->json([
            'products' => $products,
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
        ], 200, [], ['groups' => 'product:read']);
    }

    #[Route('/products/{productId}', name: 'get_item', methods: ['GET'])]
    public function getProduct(string $productId): JsonResponse
    {
        $item = $this->productRepository->find($productId);

        if (!$item) {
            return $this->json(['message' => 'Product not found'], 404);
        }

        return $this->json($item, 200, [], ['groups' => 'product:read']);
    }


    #[Route('/products/{productId}/stock', name: 'get_item_stock', methods: ['GET'])]
    public function getProductStock(string $productId): JsonResponse
    {
        // TODO: Implement stock management.
        // This is a dummy response as the 'stock' column is not in the 'products' table.
        $item = $this->productRepository->find($productId);

        if (!$item) {
            return $this->json(['message' => 'Product not found'], 404);
        }

        return $this->json([
            'productId' => $productId,
            'remaining' => 0, // Dummy value
        ]);
    }

    #[Route('/products/{productId}/purchase', name: 'purchase_item', methods: ['POST'])]
    public function purchaseProduct(string $productId, Request $request): JsonResponse
    {
        // TODO: Implement stock management.
        // This is a dummy response as the 'stock' column is not in the 'products' table.
        $item = $this->productRepository->find($productId);

        if (!$item) {
            return $this->json(['message' => 'Product not found'], 404);
        }

        $quantity = $request->toArray()['quantity'] ?? 0;

        if ($quantity <= 0) {
            return $this->json(['message' => 'Invalid quantity'], 400);
        }

        return $this->json([
            'productId' => $productId,
            'purchased' => $quantity,
            'remaining' => 0, // Dummy value
        ]);
    }
}
