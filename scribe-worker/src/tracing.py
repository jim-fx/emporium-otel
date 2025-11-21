from opentelemetry import trace
from opentelemetry.sdk.resources import SERVICE_NAME, Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.pika import PikaInstrumentor
import os

def configure_tracing():
    service_name = os.getenv("OTEL_SERVICE_NAME", "scribe-worker")
    resource = Resource.create(attributes={SERVICE_NAME: service_name})

    provider = TracerProvider(resource=resource)
    processor = BatchSpanProcessor(
        OTLPSpanExporter(
            endpoint=os.getenv("OTEL_EXPORTER_OTLP_ENDPOINT", "http://otel-collector:4317")
        )
    )
    provider.add_span_processor(processor)
    trace.set_tracer_provider(provider)

    print(f"Tracing configured for service: {service_name}")

if __name__ == "__main__":
    configure_tracing()
