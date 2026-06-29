import { Router } from "express";
import {
  createUsers,
  getAllUsers,
  getMyProfile,
  updateMyProfile,
} from "./user.controller";
import { Role } from "../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/register", createUsers);
router.get("/", getAllUsers);

router.get("/me", auth(Role.ADMIN, Role.USER, Role.AUTHOR), getMyProfile);
router.put(
  "/my-profile",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  updateMyProfile,
);

export const userRouter = router;
