import status from "http-status";
import { Request, Response } from "express";
import {
  createUserIntoDB,
  getAllUsersFromDB,
  getMyProfileIntoDB,
  updateMyProfileIntoDB,
} from "./user.services";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { genRefreshToken } from "../auth/auth.services";


export const createUsers = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await createUserIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: status.CREATED,
    message: "User created",
    data: { user },
  });
});

// get all users
export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await getAllUsersFromDB();

  if (users.length === 0)
    sendResponse(res, {
      success: true,
      statusCode: status.NOT_FOUND,
      message: "No users found",
      data: { users },
    });

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Users retrieved successfully",
    data: { users },
  });
});

// get my profile
export const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userProfile = await getMyProfileIntoDB(req.user?.id as string);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Profile retrieved successfully",
    data: userProfile,
  });
});

// update profile
export const updateMyProfile = catchAsync(
  async (req: Request, res: Response) => {
    const userProfile = await updateMyProfileIntoDB(
      req.user?.id as string,
      req.body,
    );
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "User updated successfully",
      data: userProfile,
    });
  },
);
