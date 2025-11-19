package db

import (
	"context"
	"fmt"

	"github.com/exaring/otelpgx"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DB struct {
	conn *pgxpool.Pool
}

func Init(ctx context.Context, dsn string) (DB, error) {
	cfg, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		return DB{}, fmt.Errorf("parse config: %w", err)
	}

	cfg.ConnConfig.Tracer = otelpgx.NewTracer()

	conn, err := pgxpool.NewWithConfig(ctx, cfg)
	if err != nil {
		return DB{}, fmt.Errorf("parse config: %w", err)
	}

	if err := otelpgx.RecordStats(conn); err != nil {
		return DB{}, fmt.Errorf("unable to record database stats: %w", err)
	}

	return DB{conn: conn}, nil
}

// Close closes the underlying connection pool.
func (db *DB) Close() {
	if db == nil || db.conn == nil {
		return
	}
	db.conn.Close()
}
