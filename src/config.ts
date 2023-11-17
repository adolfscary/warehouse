export const config = {
  position: {
    url:
      process.env.POSITION_API_URL ??
      "https://dev.aux.boxpi.com/case-study/products/${productId}/positions",
    apiKey:
      process.env.POSITION_API_KEY ??
      "MVGBMS0VQI555bTery9qJ91BfUpi53N24SkKMf9Z",
  },
  server: {
    port: process.env.PORT ?? 3000,
  },
};
