package routes

import (
	"context"

	"github.com/jim-fx/otel-shop-api/src/api/gen"
	"github.com/jim-fx/otel-shop-api/src/mapper"
)

// GetItems implements gen.StrictServerInterface.
func (c Core) GetItems(ctx context.Context, request gen.GetItemsRequestObject) (gen.GetItemsResponseObject, error) {
	products, err := c.DB.ListProducts(ctx)
	if err != nil {
		return nil, err
	}

	items := mapper.ProductsToItems(products)

	return gen.GetItems200JSONResponse{
		Items: &items,
	}, nil
}

// GetItemsItemId implements gen.StrictServerInterface.
func (c Core) GetItemsItemId(ctx context.Context, request gen.GetItemsItemIdRequestObject) (gen.GetItemsItemIdResponseObject, error) {
	product, err := c.DB.GetProductByName(ctx, request.ItemId)
	if err != nil {
		return nil, err
	}

	item := mapper.ProductToItem(*product)

	return gen.GetItemsItemId200JSONResponse(item), nil
}

// GetItemsItemIdStock implements gen.StrictServerInterface.
func (c Core) GetItemsItemIdStock(ctx context.Context, request gen.GetItemsItemIdStockRequestObject) (gen.GetItemsItemIdStockResponseObject, error) {
	panic("unimplemented")
}

// PostItemsItemIdPurchase implements gen.StrictServerInterface.
func (c Core) PostItemsItemIdPurchase(ctx context.Context, request gen.PostItemsItemIdPurchaseRequestObject) (gen.PostItemsItemIdPurchaseResponseObject, error) {
	panic("unimplemented")
}
