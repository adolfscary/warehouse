import { config } from "../../src/config";
import { startServer } from "../../src/services/server";
import { once } from "events";
import { AddressInfo } from "net";

describe("integration", () => {
  it("server", async () => {
    config.server.port = 0;
    const server = await startServer();
    const port = (server.address() as AddressInfo).port;
    const res = await fetch(`http://localhost:${port}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: ["product-1", "product-2"],
        startingPosition: { x: 0, y: 0, z: 0 },
      }),
    });

    expect(res.ok).toBe(true);
    const json = (await res.json()) as { pickingOrder?: { length?: number } };

    expect(json).toMatchSnapshot({
      pickingOrder: Array(json?.pickingOrder?.length).fill({
        productId: expect.any(String),
        positionId: expect.any(String),
      }),
      distance: expect.any(Number),
    });

    server.close();
    server.closeAllConnections();
    await once(server, "close");
  });
});
