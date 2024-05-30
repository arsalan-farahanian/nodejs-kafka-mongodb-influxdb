import express from "express";
import "dotenv/config";

const SERVER_PORT = process.env.SERVER_PORT;

const app = express();

app.listen(SERVER_PORT, () => {
  console.log(`Express running on PORT->${SERVER_PORT}`);
});
