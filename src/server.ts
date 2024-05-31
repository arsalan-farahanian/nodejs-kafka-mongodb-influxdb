import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

//loading Mongodb Models
import "./models/User";
import "./models/Connection";

import routes from "./routes/index";

//if not in the production mode, load .env file
if (process.env.NODE_ENV.trim() === "development") {
  dotenv.config();
}

const SERVER_PORT = process.env.SERVER_PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.use("/api", routes());

mongoose.connect(MONGODB_URI).then(() => {
  console.log("MONGODB CONNECTION ESTABLISHED");
});

app.listen(SERVER_PORT, () => {
  console.log(`Express running on PORT->${SERVER_PORT}`);
});
