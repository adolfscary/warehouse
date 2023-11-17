import "dotenv/config";

import { startServer } from "./services/server";

const handles: {
  server?: Awaited<ReturnType<typeof startServer>>;
} = {};

const start = async () => {
  handles.server = await startServer();
};

start().catch(console.error);
