import { serve } from "@hono/node-server";
import { app } from "../main";

serve({
  fetch: app.fetch,
  port: 8080,
});
