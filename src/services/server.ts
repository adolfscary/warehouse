import { config } from "../config";
import { getPositions } from "./position";
import { findShortestPath } from "./shortest-path";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { once } from "events";

const asyncHandler = (fun: any) => (req: Request, res: Response, next: any) => {
  Promise.resolve(fun(req, res, next)).catch(next);
};

export const startServer = async () => {
  const app = express();
  const port = config.server.port;

  app.use(bodyParser.json());

  app.post(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
      const productsIds = req.body.products;
      const startingPosition = req.body.startingPosition;
      const positions = await getPositions(productsIds);
      const result = findShortestPath({
        startingPosition,
        productsIds,
        positions,
      });
      res.json({
        pickingOrder: result.shortestPath,
        distance: result.shortestDistance,
      });
    })
  );

  const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  await once(server, "listening");

  return server;
};
