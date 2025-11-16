package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
)

type DB struct {
	conn *pgx.Conn
}

// Init initializes a new DB connection pool.
// Uses the same settings as your Deno script:
// user: postgres, password: postgres, database: app, host: localhost, port: 5432
func Init(ctx context.Context, dsn string) (DB, error) {
	conn, err := pgx.Connect(context.Background(), dsn)
	if err != nil {
		return DB{}, fmt.Errorf("parse config: %w", err)
	}

	return DB{conn: conn}, nil
}

// Close closes the underlying connection pool.
func (db *DB) Close() {
	if db == nil || db.conn == nil {
		return
	}
	db.conn.Close(context.Background())
}
