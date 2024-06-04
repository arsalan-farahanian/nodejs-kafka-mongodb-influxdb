import { Router } from "express";
const router = Router();

import userConnectionRoutes from "./userConnection";
import connectionsRoutes from "./connections";

import { connectionHandler_post } from "../controllers/connections";

//validators
import {
  userIdValidator,
  userDataValidator,
} from "../validators/user_validator";

export default function () {
  // CURRENT ROUTE: /api
  router.use("/connection", userIdValidator, userConnectionRoutes());

  router.use("/connections", userIdValidator, connectionsRoutes());

  return router;
}
