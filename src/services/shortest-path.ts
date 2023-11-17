type Vertices = Record<string, { visited: boolean; productId: string }>;
type Edges = Record<string, { toEdgeId: string; distance: number }[]>;
type VisitedPath = { productId: string; positionId: string };
type TSPResult = { shortestDistance: number; shortestPath: VisitedPath[] };
type Coordinate = { x: number; y: number; z: number };

const STARTING_POSITION_ID = "#starting-pos";

const calulcateDistance = (v1: Coordinate, v2: Coordinate) => {
  const a = Math.abs(v1.x - v2.x);
  const b = Math.abs(v1.y - v2.y);
  const c = Math.abs(v1.z - v2.z);
  const d = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2));
  return d;
};

const cloneVertices = (verticies: Vertices) => {
  return JSON.parse(JSON.stringify(verticies)) as Vertices;
};

const travelingSalesmanProblem = (input: {
  edges: Edges;
  verticies: Vertices;
  currentVerticeId: string;
  visitedPath: VisitedPath[];
  countVisitedVertices: number;
  countVertices: number;
  distance: number;
  result: TSPResult;
}) => {
  const {
    edges,
    verticies,
    currentVerticeId,
    visitedPath,
    countVisitedVertices,
    countVertices,
    distance,
    result,
  } = input;
  if (countVisitedVertices === countVertices) {
    if (distance < result.shortestDistance) {
      result.shortestDistance = distance;
      result.shortestPath = visitedPath;
      return;
    }
  }
  for (const edge of edges[currentVerticeId]) {
    if (verticies[edge.toEdgeId].visited) {
      continue;
    }
    const verticesCopy = cloneVertices(verticies);
    verticesCopy[edge.toEdgeId].visited = true;
    for (const vertice of Object.values(verticesCopy)) {
      if (vertice.productId === verticesCopy[edge.toEdgeId].productId) {
        vertice.visited = true;
      }
    }
    travelingSalesmanProblem({
      ...input,
      verticies: verticesCopy,
      countVisitedVertices: countVisitedVertices + 1,
      visitedPath: [
        ...visitedPath,
        {
          productId: verticies[edge.toEdgeId].productId,
          positionId: edge.toEdgeId,
        },
      ],
      currentVerticeId: edge.toEdgeId,
      distance: distance + edge.distance,
    });
  }
};

export const findShortestPath = ({
  startingPosition,
  productsIds,
  positions,
}: {
  startingPosition: { x: number; y: number; z: number };
  productsIds: string[];
  positions: {
    positionId: string;
    productId: string;
    x: number;
    y: number;
    z: number;
  }[];
}) => {
  const verticies: Vertices = {};
  const edges: Edges = {};

  verticies[STARTING_POSITION_ID] = { visited: true, productId: "" };
  edges[STARTING_POSITION_ID] = positions.map((p) => ({
    distance: calulcateDistance(
      { x: startingPosition.x, y: startingPosition.y, z: startingPosition.z },
      { x: p.x, y: p.y, z: p.z }
    ),
    toEdgeId: p.positionId,
  }));

  for (const position of positions) {
    verticies[position.positionId] = {
      visited: false,
      productId: position.productId,
    };
    edges[position.positionId] = positions.map((p) => ({
      distance: calulcateDistance(
        { x: position.x, y: position.y, z: position.z },
        { x: p.x, y: p.y, z: p.z }
      ),
      toEdgeId: p.positionId,
    }));
  }

  const result: TSPResult = {
    shortestDistance: Infinity,
    shortestPath: [],
  };

  travelingSalesmanProblem({
    verticies,
    edges,
    currentVerticeId: STARTING_POSITION_ID,
    countVertices: productsIds.length,
    visitedPath: [],
    countVisitedVertices: 0,
    distance: 0,
    result,
  });
  return result;
};
