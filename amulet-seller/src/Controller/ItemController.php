<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class ItemController extends AbstractController
{
    public function __construct(private readonly ProductRepository $productRepository)
    {
    }

    #[Route('/items', name: 'get_items', methods: ['GET'])]
    public function getItems(Request $request): JsonResponse
    {
        $limit = $request->query->getInt('limit', 20);
        $offset = $request->query->getInt('offset', 0);

        $items = $this->productRepository->findBy(['type' => 'charm'], null, $limit, $offset);
        $total = $this->productRepository->count(['type' => 'charm']);

        return $this->json([
            'items' => $items,
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
        ], 200, [], ['groups' => 'product:read']);
    }

    #[Route('/items/{itemId}', name: 'get_item', methods: ['GET'])]
    public function getItem(string $itemId): JsonResponse
    {
        $item = $this->productRepository->find($itemId);

        if (!$item) {
            return $this->json(['message' => 'Item not found'], 404);
        }

        return $this->json($item, 200, [], ['groups' => 'product:read']);
    }


    #[Route('/items/{itemId}/stock', name: 'get_item_stock', methods: ['GET'])]
    public function getItemStock(string $itemId): JsonResponse
    {
        // TODO: Implement stock management.
        // This is a dummy response as the 'stock' column is not in the 'products' table.
        $item = $this->productRepository->find($itemId);

        if (!$item) {
            return $this->json(['message' => 'Item not found'], 404);
        }

        return $this->json([
            'itemId' => $itemId,
            'remaining' => 0, // Dummy value
        ]);
    }

    #[Route('/items/{itemId}/purchase', name: 'purchase_item', methods: ['POST'])]
    public function purchaseItem(string $itemId, Request $request): JsonResponse
    {
        // TODO: Implement stock management.
        // This is a dummy response as the 'stock' column is not in the 'products' table.
        $item = $this->productRepository->find($itemId);

        if (!$item) {
            return $this->json(['message' => 'Item not found'], 404);
        }

        $quantity = $request->toArray()['quantity'] ?? 0;

        if ($quantity <= 0) {
            return $this->json(['message' => 'Invalid quantity'], 400);
        }

        return $this->json([
            'itemId' => $itemId,
            'purchased' => $quantity,
            'remaining' => 0, // Dummy value
        ]);
    }
}
