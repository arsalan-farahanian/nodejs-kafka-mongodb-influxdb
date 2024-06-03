import { Request, Response, NextFunction } from "express";

import { child1 } from "../server";

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
