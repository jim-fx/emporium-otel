package routes

import (
	"context"

	"github.com/jim-fx/otel-shop-api/src/api/gen"
	"github.com/jim-fx/otel-shop-api/src/mapper"
)

// GetProducts implements gen.StrictServerInterface.
func (c Core) GetProducts(ctx context.Context, request gen.GetProductsRequestObject) (gen.GetProductsResponseObject, error) {
	products, err := c.DB.ListProducts(ctx)
	if err != nil {
		return nil, err
	}

	res := mapper.ProductsToItems(products)

	return gen.GetProducts200JSONResponse{
		Products: &res,
	}, nil
}

// GetProductsProductId implements gen.StrictServerInterface.
func (c Core) GetProductsProductId(ctx context.Context, request gen.GetProductsProductIdRequestObject) (gen.GetProductsProductIdResponseObject, error) {
	product, err := c.DB.GetProductByName(ctx, request.ProductId)
	if err != nil {
		return nil, err
	}

	item := mapper.ProductToItem(*product)

	return gen.GetProductsProductId200JSONResponse(item), nil
}

// GetProductsProductIdStock implements gen.StrictServerInterface.
func (c Core) GetProductsProductIdStock(ctx context.Context, request gen.GetProductsProductIdStockRequestObject) (gen.GetProductsProductIdStockResponseObject, error) {
	panic("unimplemented")
}

// PostProductsProductIdPurchase implements gen.StrictServerInterface.
func (c Core) PostProductsProductIdPurchase(ctx context.Context, request gen.PostProductsProductIdPurchaseRequestObject) (gen.PostProductsProductIdPurchaseResponseObject, error) {
	panic("unimplemented")
}
