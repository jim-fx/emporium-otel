package mapper

import (
	"github.com/jim-fx/otel-shop-api/src/api/gen"
	"github.com/jim-fx/otel-shop-api/src/db"
)

func ProductRarityToItem(rarity string) gen.ItemRarity {
	switch rarity {
	case "common":
		return gen.Common
	case "epic":
		return gen.Epic
	case "legendary":
		return gen.Legendary
	case "rare":
		return gen.Rare
	case "Uncommon":
		return gen.Uncommon
	default:
		return gen.Common
	}
}

func ProductToItem(product db.Product) gen.Item {
	rarity := ProductRarityToItem(product.Rarity)
	return gen.Item{
		Description: &product.Description,
		Name:        product.Name,
		Price:       float32(product.Price),
		Rarity:      &rarity,
		Stock:       1,
	}
}

func ProductsToItems(products []db.Product) []gen.Item {
	res := make([]gen.Item, len(products))
	for i, product := range products {
		res[i] = ProductToItem(product)
	}
	return res
}
