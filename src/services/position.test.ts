import { getPositions } from "../../src/services/position";

describe("service position", () => {
  it("getPositions", async () => {
    const positions = await getPositions(["product-1"]);
    expect(positions).toMatchSnapshot(
      Array(positions.length).fill({
        positionId: expect.any(String),
        productId: expect.any(String),
        quantity: expect.any(Number),
        x: expect.any(Number),
        y: expect.any(Number),
        z: expect.any(Number),
      })
    );
  });
});
