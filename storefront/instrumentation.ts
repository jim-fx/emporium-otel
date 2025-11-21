import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { UndiciInstrumentation } from "@opentelemetry/instrumentation-undici";

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "storefront",
  }),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new UndiciInstrumentation(),
  ],
});
sdk.start();
