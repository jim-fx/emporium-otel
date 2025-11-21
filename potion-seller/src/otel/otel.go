package otel

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/url"
	"os"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/metric"
	"go.opentelemetry.io/otel/sdk/resource"
	"go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.24.0"
)

func getOtelHost() (string, error) {
	endpoint := os.Getenv("OTEL_EXPORTER_OTLP_ENDPOINT")

	u, err := url.Parse(endpoint)
	if err != nil {
		return "", err
	}

	host := u.Hostname()
	port := u.Port()

	if port == "" {
		switch u.Scheme {
		case "http":
			port = "80"
		case "https":
			port = "443"
		}
	}

	if port == "" {
		return host, nil
	}

	return net.JoinHostPort(host, port), nil
}

func initTracerProvider(ctx context.Context) (func(context.Context) error, error) {
	endpoint, err := getOtelHost()
	if err != nil {
		return nil, err
	}
	exp, err := otlptracehttp.New(ctx,
		otlptracehttp.WithInsecure(),
		otlptracehttp.WithEndpoint(endpoint),
	)
	if err != nil {
		return nil, err
	}
	res, err := resource.New(ctx,
		resource.WithAttributes(
			semconv.ServiceName(os.Getenv("OTEL_SERVICE_NAME")),
		),
	)
	if err != nil {
		return nil, err
	}
	bsp := trace.NewBatchSpanProcessor(exp)
	tracerProvider := trace.NewTracerProvider(
		trace.WithSampler(trace.AlwaysSample()),
		trace.WithResource(res),
		trace.WithSpanProcessor(bsp),
	)

	otel.SetTracerProvider(tracerProvider)

	otel.SetTextMapPropagator(
		propagation.NewCompositeTextMapPropagator(
			propagation.TraceContext{},
			propagation.Baggage{},
		),
	)

	return tracerProvider.Shutdown, nil
}

func initMeterProvider(ctx context.Context) (func(context.Context) error, error) {
	endpoint, err := getOtelHost()
	if err != nil {
		return nil, err
	}

	exp, err := otlpmetrichttp.New(ctx,
		otlpmetrichttp.WithInsecure(),
		otlpmetrichttp.WithEndpoint(endpoint),
	)
	if err != nil {
		return nil, err
	}
	res, err := resource.New(ctx,
		resource.WithAttributes(
			semconv.ServiceName(os.Getenv("OTEL_SERVICE_NAME")),
		),
	)
	if err != nil {
		return nil, err
	}
	meterProvider := metric.NewMeterProvider(
		metric.WithReader(metric.NewPeriodicReader(exp)),
		metric.WithResource(res),
	)
	otel.SetMeterProvider(meterProvider)
	return meterProvider.Shutdown, nil
}

func Setup(ctx context.Context) (func(), error) {
	shutdownTracer, err := initTracerProvider(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize tracer provider: %w", err)
	}

	shutdownMeter, err := initMeterProvider(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize meter provider: %w", err)
	}

	return func() {
		if err := shutdownTracer(ctx); err != nil {
			log.Fatalf("failed to shutdown TracerProvider: %v", err)
		}
		if err := shutdownMeter(ctx); err != nil {
			log.Fatalf("failed to shutdown MeterProvider: %v", err)
		}
	}, nil
}
