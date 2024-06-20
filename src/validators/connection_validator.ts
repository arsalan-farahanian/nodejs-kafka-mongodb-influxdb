import { param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import Connection from "../models/Connection";

export const connectionDoesExist = [
  param("connectionName")
    .trim()
    .exists()
    .escape()
    .custom(async (value: string) => {
      let doesExist = await Connection.doesExist(value);
      if (!doesExist) {
        throw new Error("Connection does not exist");
      }

      return true;
    }),
  (req: Request, res: Response<JSONResponseFormat>, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
        data: null,
        error: {
          code: 404,
          body: [
            {
              msg: "Connection Not Found",
            },
          ],
        },
      });
    }

    next();
  },
];
