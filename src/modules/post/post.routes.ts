import { Router } from "express";
import {
  createPost,
  deletePostById,
  getAllPosts,
  getMyPos,
  getPostById,
  getPostStats,
  updatePostById,
} from "./post.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.ADMIN, Role.USER, Role.AUTHOR), createPost);

router.get("/", getAllPosts);

router.get("/stats", auth(Role.ADMIN), getPostStats);

router.get("/my-posts", auth(Role.ADMIN, Role.USER, Role.AUTHOR), getMyPos);

router.get('/:postId', getPostById)

router.patch('/:postId', updatePostById)

router.delete('/:postId', deletePostById)

export const postRoutes = router;
