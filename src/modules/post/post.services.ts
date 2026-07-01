import { Role } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IPostInterface, UPost } from "./post.interface";

// create post
export const createPostIntoDB = async (
  payload: IPostInterface,
  authorId: string,
) => {
  const {
    title,
    description,
    tags: [...tags],
  } = payload;
  const post = await prisma.post.create({
    data: {
      title,
      description,
      tags,
      authorId,
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
    },
  });
  return post;
};

// get all post
export const getAllPostIntoDB = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const posts = await prisma.post.findMany({
    skip: skip,
    take: limit,

    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.post.count();
  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: posts
  };
};

// get my post
export const getMyPostIntoDB = async (authorId: string) => {
  const myPosts = await prisma.post.findMany({
    where: {
      authorId,
    },
  });

  return myPosts;
};

// get post by id
export const getPostByIdIntoDB = async (postId: string) => {
  const singlePost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!singlePost) {
    throw new Error("Post Not Found!");
  }

  return singlePost;
};

// status only admin
export const getPostStatsIntoDB = async () => {};

// update post by id
export const updatePostByIdIntoDB = async (
  payload: UPost,
  postId: string,
  authorId: string,
  role: Role,
) => {
  const { title, description, thumbnail } = payload;
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  if (authorId !== post.authorId && role !== Role.ADMIN) {
    throw new Error("Forbidden: You can't update this post!");
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: { title, description, thumbnail },
  });

  return updatedPost;
};

// delete post by id
export const deletePostByIdIntoDB = async (
  postId: string,
  authorId: string,
  role: string,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  if (authorId !== post.authorId && role !== Role.ADMIN) {
    throw new Error("Forbidden: You can't delete this post!");
  }

  const deletePost = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return deletePost;
};
