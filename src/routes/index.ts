import { Router } from "express";
const router = Router();

import userConnectionRoutes from "./userConnection";

//validators
import { userIdValidator } from "../validators/user_validator";

export default function () {
  // CURRENT ROUTE: /api
  router.use("/connection", userIdValidator, userConnectionRoutes());

  return router;
}
