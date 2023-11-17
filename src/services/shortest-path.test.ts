import { findShortestPath } from "../../src/services/shortest-path";

describe("service shortest-path", () => {
  it("findShortestPath", async () => {
    const result = findShortestPath({
      startingPosition: {
        x: 0,
        y: 0,
        z: 0,
      },
      positions: [{ positionId: "A1", productId: "A", x: 0, y: 0, z: 0 }],
      productsIds: ["A"],
    });
    expect(result).toStrictEqual({
      shortestDistance: 0,
      shortestPath: [{ positionId: "A1", productId: "A" }],
    });
  });
});
