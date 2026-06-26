import status from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";


const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: status.NOT_FOUND,
        message: "Internal Server Error",
        error: (error as Error).message,
      });
    }
  };
};

export default catchAsync;