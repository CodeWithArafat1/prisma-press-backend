import { Router } from "express";
import {
  createPost,
  deletePostById,
  getAllPosts,
  getMyPost,
  getPostById,
  getPostStats,
  updatePostById,
} from "./post.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.ADMIN, Role.USER, Role.AUTHOR), createPost);

router.get("/", getAllPosts);

router.get("/my-posts", auth(Role.ADMIN, Role.USER, Role.AUTHOR), getMyPost);

router.get("/stats", auth(Role.ADMIN), getPostStats);

router.get('/:postId', getPostById)

router.patch('/my-post/:postId',auth(Role.ADMIN, Role.USER, Role.AUTHOR), updatePostById)

router.delete('/my-post/:postId',auth(Role.ADMIN, Role.USER, Role.AUTHOR), deletePostById)

export const postRoutes = router;
