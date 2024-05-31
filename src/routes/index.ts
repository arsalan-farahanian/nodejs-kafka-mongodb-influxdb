import { Router } from "express";
const router = Router();

import userConnectionRoutes from "./userConnection";

export default function () {
  // CURRENT ROUTE: /api
  router.use("/connection", userConnectionRoutes());

  return router;
}
