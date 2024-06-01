import { Router } from "express";
const router = Router();

//controllers
import {
  connection_get,
  connection_post,
  connection_delete,
  connection_update,
} from "../controllers/userConnection";

export default function () {
  // CURRENT ROUTE: /api/connection
  // routes for doing CRUD operations on connections

  //retrieve one or more connections
  router.get("/", connection_get);
  router.post("/", connection_post); //create a new connection
  router.delete("/:connectionName", connection_delete); // delete a connection;
  router.put("/:connectionName", connection_update); //edit a connection

  return router;
}
