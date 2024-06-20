import { Router } from "express";
const router = Router();

//controllers
import {
  connectionHandler_post,
  connections_get,
} from "../controllers/connections";

//validators
import {
  userDataValidator,
  userInfluxDataValidator,
} from "../validators/user_validator";
import { connectionDoesExist } from "../validators/connection_validator";

export default function () {
  // CURRENT ROUTE: /api/connections

  router.get("/", userInfluxDataValidator, connections_get);
  router.post(
    "/:connectionName",
    connectionDoesExist,
    userDataValidator,
    connectionHandler_post
  );

  return router;
}
