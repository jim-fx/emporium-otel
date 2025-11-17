package main

import (
	"context"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jim-fx/otel-shop-api/src/api"
	"github.com/jim-fx/otel-shop-api/src/db"
)

func main() {
	router := gin.Default()

	db, err := db.Init(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	api.Register(router, db)
	router.Run("0.0.0.0:80")
}
