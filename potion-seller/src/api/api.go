//go:generate go tool oapi-codegen --config=./generator-models.yaml ../../openapi.yaml
//go:generate go tool oapi-codegen --config=./generator-routes.yaml ../../openapi.yaml
package api

import (
	"github.com/gin-gonic/gin"
	"github.com/jim-fx/otel-shop-api/src/api/gen"
	"github.com/jim-fx/otel-shop-api/src/api/routes"
	"github.com/jim-fx/otel-shop-api/src/db"

	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
)

func Register(router gin.IRouter, db db.DB) {
	router.Use(otelgin.Middleware("potion-seller"))
	gen.RegisterHandlers(router, gen.NewStrictHandler(&routes.Core{
		DB: db,
	}, nil))
}
