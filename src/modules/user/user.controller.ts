import status from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { createUserIntoDB, getAllUsersFromDB } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

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

// export const createUsers = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;

//     const user = await createUserIntoDB(payload);

//     res.status(status.CREATED).json({
//       success: true,
//       statusCode: status.CREATED,
//       message: "User created successfully",
//       data: { user },
//     });
//   } catch (error) {
//     res.status(status.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       statusCode: status.NOT_FOUND,
//       message: "Internal Server Error",
//       error: (error as Error).message,
//     });
//   }
// };

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

// get all users
// export const getAllUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await getAllUsersFromDB();
//     if (users.length === 0) {
//       res.status(status.NOT_FOUND).json({
//         success: true,
//         statusCode: status.NOT_FOUND,
//         message: "No users found",
//         data: { users },
//       });
//     }

//     res.status(status.OK).json({
//       success: true,
//       statusCode: status.OK,
//       message: "User retrieved successfully",
//       data: { users },
//     });
//   } catch (error) {
//     res.status(status.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       statusCode: status.NOT_FOUND,
//       message: "Internal Server Error",
//       error: (error as Error).message,
//     });
//   }
// };
