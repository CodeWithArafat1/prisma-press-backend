import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../generated/prisma/enums";
import { createComment, deleteCommentById, getAllComments, getCommentById, getCommentStats, updateCommentById } from "./comment.controller";

const router = Router();

router.post("/", auth(Role.ADMIN, Role.USER, Role.AUTHOR), createComment);

router.get("/", getAllComments);

router.get("/stats", auth(Role.ADMIN), getCommentStats);


router.get('/:commentId', getCommentById)

router.put('/:commentId',auth(Role.ADMIN, Role.USER, Role.AUTHOR), updateCommentById)

router.delete('/:commentId',auth(Role.ADMIN, Role.USER, Role.AUTHOR), deleteCommentById)

export const commentRoutes = router;
