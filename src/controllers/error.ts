import { Request, Response, NextFunction } from "express";

export function notFound404(
  req: Request,
  res: Response<JSONResponseFormat>,
  next: NextFunction
) {
  res.status(404).json({
    success: false,
    message: "Not Found",
    data: null,
    error: {
      code: 404,
      body: null,
    },
  });
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<JSONResponseFormat>,
  next: NextFunction
) {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Server Error",
    data: null,
    error: {
      code: 500,
      body: null,
    },
  });
}
