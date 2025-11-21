package routes

import (
	"context"

	"github.com/gin-gonic/gin"
	"github.com/jim-fx/otel-shop-api/src/api/gen"
	"github.com/jim-fx/otel-shop-api/src/mapper"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
)

var tracer = otel.Tracer("potion-seller/routes")

func (c Core) GetProducts(ctx context.Context, request gen.GetProductsRequestObject) (gen.GetProductsResponseObject, error) {
	gctx := ctx.(*gin.Context)

	ctx, span := tracer.Start(gctx.Request.Context(), "GetProducts")
	defer span.End()

	products, err := c.DB.ListProducts(ctx)
	if err != nil {
		return nil, err
	}

	res := mapper.ProductsToItems(products)

	return gen.GetProducts200JSONResponse{
		Products: &res,
	}, nil
}

func (c Core) GetProductsProductId(ctx context.Context, request gen.GetProductsProductIdRequestObject) (gen.GetProductsProductIdResponseObject, error) {
	gctx := ctx.(*gin.Context)

	ctx, span := tracer.Start(gctx.Request.Context(), "GetProductsByProductId")
	span.SetAttributes(attribute.String("product_id", request.ProductId))
	defer span.End()

	product, err := c.DB.GetProductByName(ctx, request.ProductId)
	if err != nil {
		return nil, err
	}

	item := mapper.ProductToItem(*product)

	return gen.GetProductsProductId200JSONResponse(item), nil
}
