import express from "express";

const app = express();

export const server = app.listen(8000, () =>
  // eslint-disable-next-line no-console
  console.log(`app listen to port ${8000}`)
);
