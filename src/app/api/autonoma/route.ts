import { createHandler } from "@autonoma-ai/server-web";

const handler = createHandler({
  scopeField: "testRunId",
  sharedSecret: process.env.AUTONOMA_SHARED_SECRET ?? "",
  signingSecret: process.env.AUTONOMA_SIGNING_SECRET ?? "",
  factories: {},
  auth: async () => ({}),
});

export const POST = handler;