package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"go.opentelemetry.io/otel"
)

var tracer = otel.Tracer("potion-seller/db")

type Product struct {
	ID          string `db:"id"`
	Name        string `db:"name"`
	Type        string `db:"type"`
	Rarity      string `db:"rarity"`
	Price       int    `db:"price"`
	Image       string `db:"image"`
	Description string `db:"description"`
	Quantity    int    `db:"quantity"`
}

// ListProducts returns all products ordered by name.
func (db *DB) ListProducts(ctx context.Context) ([]Product, error) {
	ctx, span := tracer.Start(ctx, "ListProducts")
	defer span.End()

	rows, err := db.conn.Query(ctx, `
		SELECT
			id,
			name,
			type,
			rarity,
			price,
			image,
			description,
			quantity
		FROM products
		WHERE type = 'potion'
		ORDER BY name;
	`)
	if err != nil {
		return nil, fmt.Errorf("query products: %w", err)
	}
	defer rows.Close()

	products, err := pgx.CollectRows(rows, pgx.RowToStructByName[Product])
	if err != nil {
		return nil, fmt.Errorf("collect products: %w", err)
	}

	return products, nil
}

// GetProductByName returns a single product by its name.
// If no product is found, (*Product, nil) is returned as (nil, nil).
func (db *DB) GetProductByName(ctx context.Context, name string) (*Product, error) {
	rows, err := db.conn.Query(ctx, `
		SELECT
			id,
			name,
			type,
			rarity,
			price,
			image,
			description,
			quantity
		FROM products
		WHERE name = $1 AND type = 'potion'
		LIMIT 1;
	`, name)
	if err != nil {
		return nil, fmt.Errorf("query products: %w", err)
	}
	defer rows.Close()

	fmt.Println(rows.RawValues())

	products, err := pgx.CollectRows(rows, pgx.RowToStructByName[Product])
	if err != nil {
		return nil, fmt.Errorf("collect products: %w", err)
	}

	if len(products) == 0 {
		return nil, fmt.Errorf("product not found")
	}

	return &products[0], nil
}
