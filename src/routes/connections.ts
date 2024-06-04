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

export default function () {
  // CURRENT ROUTE: /api/connections

  router.get("/", userInfluxDataValidator, connections_get);
  router.post("/:connectionName", userDataValidator, connectionHandler_post);

  return router;
}
