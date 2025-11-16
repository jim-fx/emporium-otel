// routes provides routes
package routes

import (
	"github.com/jim-fx/otel-shop-api/src/api/gen"
	"github.com/jim-fx/otel-shop-api/src/db"
)

type Core struct {
	DB db.DB
}

var _ gen.StrictServerInterface = Core{}
