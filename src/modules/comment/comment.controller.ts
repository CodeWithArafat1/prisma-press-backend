import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

// create Comment
export const createComment = catchAsync(async (req: Request, res: Response) => {});

// get all Comments
export const getAllComments = catchAsync(
  async (req: Request, res: Response) => {},
);

// get all Comments
export const getMyPos = catchAsync(async (req: Request, res: Response) => {});

// status only admin
export const getCommentStats = catchAsync(
  async (req: Request, res: Response) => {},
);

// get Comment by id
export const getCommentById = catchAsync(
  async (req: Request, res: Response) => {},
);

// update Comment by id
export const updateCommentById = catchAsync(
  async (req: Request, res: Response) => {},
);

// delete Comment by id
export const deleteCommentById = catchAsync(
  async (req: Request, res: Response) => {},
);
