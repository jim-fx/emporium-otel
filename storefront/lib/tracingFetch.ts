import { context, trace, TraceFlags } from "@opentelemetry/api";

function getTraceparent(): string | undefined {
  const span = trace.getSpan(context.active());
  if (!span) return;

  const spanContext = span.spanContext();
  if (!spanContext || !trace.isSpanContextValid(spanContext)) return;

  const version = "00";
  const traceId = spanContext.traceId;
  const spanId = spanContext.spanId;
  const sampled =
    (spanContext.traceFlags & TraceFlags.SAMPLED) === TraceFlags.SAMPLED
      ? "01"
      : "00";

  return `${version}-${traceId}-${spanId}-${sampled}`;
}

export function tracedFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(init.headers ?? {});
  const traceparent = getTraceparent();

  if (traceparent) {
    headers.set("traceparent", traceparent);
  }

  return fetch(input, {
    ...init,
    headers,
  });
}
