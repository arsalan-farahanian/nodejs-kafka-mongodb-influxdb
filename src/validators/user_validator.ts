import { header, body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import User from "../models/User";

export const userIdValidator = [
  header("USER_ID")
    .trim()
    .notEmpty()
    .escape()
    .isLength({ min: 24, max: 24 })
    .custom(async (value: string) => {
      const userId = new Types.ObjectId(value);
      try {
        const doesExist = await User.userExists(userId);
        if (!doesExist) {
          throw new Error("Invalid User ID");
        }
        return true;
      } catch (error) {
        throw error;
      }
    }),
  (req: Request, res: Response<JSONResponseFormat>, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Unprocessable entity",
        data: null,
        error: {
          code: 422,

          body: [
            {
              msg: "Invalid User ID",
            },
          ],
        },
      });
    }

    next();
  },
];

export const userDataValidator = [
  body("ts").exists().notEmpty().trim().escape().isInt(),
  body("name")
    .exists()
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 3, max: 50 }),
  body("value")
    .exists()
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 3, max: 300 }),
  (req: Request, res: Response<JSONResponseFormat>, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Unprocessable entity",
        data: null,
        error: {
          code: 422,
          body: [
            {
              msg: "Invalid Data",
            },
          ],
        },
      });
    }

    next();
  },
];
