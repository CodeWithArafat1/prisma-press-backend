import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { genRefreshToken, loginUserIntoDB } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { accessToken, refreshToken } = await loginUserIntoDB(payload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, // 1 days
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "User logged in successfully",
      data: { accessToken, refreshToken },
    });
  },
);

// generate access token
export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const { accessToken } = await genRefreshToken(refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24, // 1 days
  });

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Token refreshed successfully!",
    data: { accessToken },
  });
});
