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

        error_log('OTel headers: ' . json_encode([
            'traceparent' => $_SERVER['HTTP_TRACEPARENT'] ?? null,
            'tracestate'  => $_SERVER['HTTP_TRACESTATE'] ?? null,
            'baggage'     => $_SERVER['HTTP_BAGGAGE'] ?? null,
        ]));

        return $this->json([
            'products' => $products,
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
        ], 200, [], ['groups' => 'product:read']);
    }

    #[Route('/products/{productName}', name: 'get_item', methods: ['GET'])]
    public function getProduct(string $productName): JsonResponse
    {
        $item = $this->productRepository->findOneBy(["name" => $productName], null, 1);

        if (!$item) {
            return $this->json(['message' => 'Product not found'], 404);
        }

        return $this->json($item, 200, [], ['groups' => 'product:read']);
    }

}
