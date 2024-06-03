import { Router } from "express";
const router = Router();

import userConnectionRoutes from "./userConnection";

import { connectionHandler_post } from "../controllers/connections";

//validators
import {
  userIdValidator,
  userDataValidator,
} from "../validators/user_validator";

export default function () {
  // CURRENT ROUTE: /api
  router.use("/connection", userIdValidator, userConnectionRoutes());

  //since there is just one route, a separate module was not created
  router.post(
    "/connections/:connectionName",
    userIdValidator,
    userDataValidator,
    connectionHandler_post
  );

  return router;
}
