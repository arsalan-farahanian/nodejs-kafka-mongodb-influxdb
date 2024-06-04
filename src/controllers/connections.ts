/**
 * this is module holds the controllers of the user made connection routes
 */
import { Request, Response, NextFunction } from "express";

import { child1 } from "../server";

import { queryData } from "../services/influx/queries";

export async function connectionHandler_post(
  req: Request,
  res: Response<JSONResponseFormat>,
  next: NextFunction
) {
  const userId = req.header("USER_ID") as string;
  const userData: UserData = req.body;
  const data: InfluxUserData = { ...userData, tag: userId };

  child1.send(data);
  res.status(200).json({
    success: true,
    message: "Data was received by the server",
    data,
  });
}

export async function connections_get(
  req: Request,
  res: Response<JSONResponseFormat>,
  next: NextFunction
) {
  const userId = req.header("USER_ID") as string;
  const name = req.query.name as string;
  const start = +(req.query.start as string); //convert to integer
  const end = +(req.query.end as string);

  try {
    let data = await queryData(userId, name, start, end);
    res.status(200).json({
      success: true,
      message: "Data received",
      data,
    });
  } catch (error) {
    next(error);
  }
}
