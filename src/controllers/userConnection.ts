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

  let page: number = req.query.page ? Number(req.query.page) : 1;
  let limit: number = req.query.limit ? Number(req.query.limit) : 10;

  //if the casting resulted in NaN
  page = isNaN(page) ? 1 : page;
  limit = isNaN(limit) ? 10 : limit;

  try {
    const data = await Connection.getConnections(userId, page, limit);
    res.status(200).json({
      success: true,
      message: "Successful Operation",
      data: data.connections.length > 0 ? data.connections : null,
      pagination: {
        currentPage: page,
        limit,
        totalItems: data.totalConnections,
        totalPages: Math.ceil(data.totalConnections / limit),
      },
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
    });
  } catch (error) {
    console.log(error);
  }
}

export async function connection_delete(
  req: Request,
  res: Response<JSONResponseFormat>,
  next: NextFunction
) {
  const connectionName = req.params.connectionName;
  try {
    await Connection.deleteConnection(connectionName);
    res.status(200).json({
      success: true,
      message: "Connection deleted",
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function connection_update(
  req: Request,
  res: Response<JSONResponseFormat>,
  next: NextFunction
) {
  const connectionName = req.params.connectionName;
  const isActive = req.query.isActive as string;

  try {
    const connection = await Connection.updateConnection(connectionName, {
      isActive: isActive.trim().toLowerCase() === "true",
    });
    res.status(200).json({
      success: true,
      message: "Connection updated",
      data: connection,
    });
  } catch (error) {
    console.log(error);
  }
}
