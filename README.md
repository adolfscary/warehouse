# GymBeam warehouse HTTP server

HTTP endpoint will find shortest path to pick all provided products from starting point.

Example request
`POST /`

```json
{
  "products": ["product-1", "product-2"],
  "startingPosition": { "x": 0, "y": 0, "z": 0 }
}
```

Example response

```json
{
  "pickingOrder": [
    { "productId": "product-1", "positionId": "position-31" },
    { "productId": "product-2", "positionId": "position-241" }
  ],
  "distance": 14.16227766016838
}
```

# Local development

`npm install`

## Run server dev

`npm run dev`

## Run tests

`npm test`

## Run tests watch

`npm test:watch`

## Run build

`npm run build`

## Run server

`npm start`

# Dev container

Open folder in dev container
wait postCreateCommand then reload window (only first time)
it start server & tests in dev mode.
