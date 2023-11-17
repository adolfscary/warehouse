import { config } from "../config";
import axios from "axios";

type Position = {
  positionId: string;
  x: number;
  y: number;
  z: number;
  productId: string;
  quantity: number;
};

const getPosition = async (productId: string): Promise<Position[]> => {
  const url = config.position.url.replace("${productId}", productId);

  const { data } = await axios({
    url,
    method: "GET",
    headers: {
      "X-API-KEY": config.position.apiKey,
    },
  });
  return data;
};

export const getPositions = async (productIds: string[]) => {
  return (
    await Promise.all(productIds.map((productId) => getPosition(productId)))
  ).flat();
};
