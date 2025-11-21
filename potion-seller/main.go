package main

import (
	"context"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jim-fx/otel-shop-api/src/api"
	"github.com/jim-fx/otel-shop-api/src/db"
	"github.com/jim-fx/otel-shop-api/src/otel"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
)

func main() {
	router := gin.Default()

	router.Use(otelgin.Middleware("potion-seller"))

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	shutdownOtel, err := otel.Setup(ctx)
	if err != nil {
		panic(err)
	}
	defer shutdownOtel()

	db, err := db.Init(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	api.Register(router, db)

	if err := router.Run("0.0.0.0:80"); err != nil {
		panic(err)
	}
}
