package mapper

import (
	"github.com/jim-fx/otel-shop-api/src/api/gen"
	"github.com/jim-fx/otel-shop-api/src/db"
)

func ProductRarityToItem(rarity string) gen.ProductRarity {
	switch rarity {
	case "epic":
		return gen.Epic
	case "legendary":
		return gen.Legendary
	case "rare":
		return gen.Rare
	default:
		return gen.Common
	}
}

func ProductTypeToType(itemType string) gen.ProductType {
	switch itemType {
	case "charm":
		return gen.Charm
	case "weapon":
		return gen.Weapon
	case "potion":
		return gen.Potion
	default:
		panic("UNknown item type")
	}
}

func ProductToItem(product db.Product) gen.Product {
	rarity := ProductRarityToItem(product.Rarity)
	itemType := ProductTypeToType(product.Type)
	return gen.Product{
		Id:          product.ID,
		Description: &product.Description,
		Name:        product.Name,
		Price:       float32(product.Price),
		Image:       &product.Image,
		Type:        &itemType,
		Rarity:      &rarity,
		Quantity:    &product.Quantity,
	}
}

func ProductsToItems(products []db.Product) []gen.Product {
	res := make([]gen.Product, len(products))
	for i, product := range products {
		res[i] = ProductToItem(product)
	}
	return res
}
