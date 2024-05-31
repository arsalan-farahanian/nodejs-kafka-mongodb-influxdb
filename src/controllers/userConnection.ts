import { Request, Response, NextFunction } from "express";

// Mongodb Model
import { Types } from "mongoose";
import Connection from "../models/Connection";

export async function connection_get(
  req: Request,
  res: Response<JSONResponseFormat>,
  next: NextFunction
) {
  //converting string to mongoose ObjectId
  const userId = new Types.ObjectId(req.header("USER_ID") as string);

  try {
    const data = await Connection.getConnections(userId);
    res.status(200).json({
      success: true,
      message: "Successful Operation",
      data: data.connections.length > 0 ? data.connections : null,
      pagination: null,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function connection_post(
  req: Request,
  res: Response<JSONResponseFormat>,
  next: NextFunction
) {
  //converting string to mongoose ObjectId
  const userId = new Types.ObjectId(req.header("USER_ID") as string);

  try {
    const connection = await Connection.newConnection(userId);
    res.status(201).json({
      success: true,
      message: "Connection created",
      data: connection,
      pagination: null,
    });
  } catch (error) {
    console.log(error);
  }
}
