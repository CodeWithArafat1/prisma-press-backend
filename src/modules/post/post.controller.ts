import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import {
  createPostIntoDB,
  deletePostByIdIntoDB,
  getAllPostIntoDB,
  getMyPostIntoDB,
  getPostByIdIntoDB,
  updatePostByIdIntoDB,
} from "./post.services";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";
import { Role } from "../../generated/prisma/enums";

// create post
export const createPost = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const createPost = await createPostIntoDB(payload, req.user?.id as string);
  sendResponse(res, {
    success: true,
    statusCode: status.CREATED,
    message: "Post created successfully!",
    data: createPost,
  });
});

// get all posts
export const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 5
  const posts = await getAllPostIntoDB(page, limit);
  if(posts.data.length === 0){
    sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "posts not found!",
    data: posts.data,

  });
  }
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "posts retrieved successfully!",
    total: posts.meta.total,
    data: posts.data,

  });
});

// get my posts
export const getMyPost = catchAsync(async (req: Request, res: Response) => {
  const myPost = await getMyPostIntoDB(req.user?.id as string);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "my posts retrieved successfully!",
    data: myPost,
  });
});

// status only admin
export const getPostStats = catchAsync(
  async (req: Request, res: Response) => {},
);

// get post by id
export const getPostById = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.postId as string;
  const singlePost = await getPostByIdIntoDB(postId);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "single posts retrieved successfully!",
    data: singlePost,
  });
});

// update post by id
export const updatePostById = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const { postId } = req.params;
    const authorId = req.user?.id;
    const role = req.user?.role;
    const updatePost = await updatePostByIdIntoDB(
      payload,
      postId as string,
      authorId as string,
      role as Role,
    );

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "post updated successfully!",
      data: updatePost,
    });
  },
);

// delete post by id
export const deletePostById = catchAsync(
  async (req: Request, res: Response) => {
    const { postId } = req.params;
    const authorId = req.user?.id;
    const role = req.user?.role;

    const deletePost = await deletePostByIdIntoDB(postId as string, authorId as string, role as Role)
     sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "post delete successfully!",
      data: deletePost,
    });
  },
);
