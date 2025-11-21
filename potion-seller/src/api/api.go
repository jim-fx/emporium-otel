// Package api provides routes
//
//go:generate go tool oapi-codegen --config=./generator-models.yaml ../../openapi.yaml
//go:generate go tool oapi-codegen --config=./generator-routes.yaml ../../openapi.yaml
package api

import (
	"github.com/gin-gonic/gin"
	"github.com/jim-fx/otel-shop-api/src/api/gen"
	"github.com/jim-fx/otel-shop-api/src/api/routes"
	"github.com/jim-fx/otel-shop-api/src/db"
)

func Register(router gin.IRouter, db db.DB) {
	gen.RegisterHandlers(router, gen.NewStrictHandler(&routes.Core{
		DB: db,
	}, nil))
}
