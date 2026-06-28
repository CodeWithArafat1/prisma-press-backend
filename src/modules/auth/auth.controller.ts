import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { loginUserIntoDB } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    
    const loginResult = await loginUserIntoDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "User logged in successfully",
      data: loginResult,
    });
  },
);
