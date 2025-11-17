package mapper

import (
	"github.com/jim-fx/otel-shop-api/src/api/gen"
	"github.com/jim-fx/otel-shop-api/src/db"
)

func ProductRarityToItem(rarity string) gen.ItemRarity {
	switch rarity {
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

func ProductTypeToType(itemType string) gen.ItemType {
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

func ProductToItem(product db.Product) gen.Item {
	rarity := ProductRarityToItem(product.Rarity)
	itemType := ProductTypeToType(product.Type)
	return gen.Item{
		Id:          product.ID,
		Description: &product.Description,
		Name:        product.Name,
		Price:       float32(product.Price),
		Image:       &product.Image,
		Type:        &itemType,
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
