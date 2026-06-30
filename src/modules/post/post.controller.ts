import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

// create post
export const createPost = catchAsync(async (req: Request, res: Response) => {});

// get all posts
export const getAllPosts = catchAsync(
  async (req: Request, res: Response) => {},
);

// get all posts
export const getMyPos = catchAsync(async (req: Request, res: Response) => {});

// status only admin
export const getPostStats = catchAsync(
  async (req: Request, res: Response) => {},
);

// get post by id
export const getPostById = catchAsync(
  async (req: Request, res: Response) => {},
);

// update post by id
export const updatePostById = catchAsync(
  async (req: Request, res: Response) => {},
);

// delete post by id
export const deletePostById = catchAsync(
  async (req: Request, res: Response) => {},
);
