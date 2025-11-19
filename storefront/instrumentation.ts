import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";

// Enable internal SDK debugging
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "storefront",
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});
console.log("Instrumentation started");
sdk.start();
