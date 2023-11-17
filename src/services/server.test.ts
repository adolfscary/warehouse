import { startServer } from "../../src/services/server";
import { config } from "../config";
import { once } from "events";

describe("service server", () => {
  it("startServer", async () => {
    config.server.port = 0;
    const server = await startServer();
    await startServer();
    server.close();
    await once(server, "close");
  });
});
