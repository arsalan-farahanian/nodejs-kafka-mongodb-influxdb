import fs from "node:fs";
import https from "node:https";
import { fork, ForkOptions } from "node:child_process";
import path from "node:path";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { writeData } from "./services/influx/queries";

//loading Mongodb Models
import "./models/User";
import "./models/Connection";

import routes from "./routes/index";

//if not in the production mode, load .env file
if (process.env.NODE_ENV.trim() === "development") {
  dotenv.config();
}

const SERVER_PORT = Number(process.env.SERVER_PORT);
const MONGODB_URI = process.env.MONGODB_URI;

const SSL_KEY_PATH = process.env.SSL_KEY_PATH;
const SSL_CERT_PATH = process.env.SSL_CERT_PATH;

const SSL_KEY = fs.readFileSync(SSL_KEY_PATH, "utf8");
const SSL_CERT = fs.readFileSync(SSL_CERT_PATH, "utf8");
const credentials: https.ServerOptions = {
  key: SSL_KEY,
  cert: SSL_CERT,
};

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.use("/api", routes());

mongoose.connect(MONGODB_URI).then(() => {
  console.log("MONGODB CONNECTION ESTABLISHED");
});

const server = https.createServer(credentials, app);
server.listen(SERVER_PORT, () => {
  console.log(`Express running on PORT->${SERVER_PORT}`);
});

//this will run the kafka producer
export const child1 = fork(path.join(__dirname, "processes", "child1.ts"));

//this will run the kafka consumer and save the data to InfluxDB
export const child2 = fork(path.join(__dirname, "processes", "child2.ts"));
