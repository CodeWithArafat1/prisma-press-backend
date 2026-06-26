import { Router } from "express";
import { createUsers, getAllUsers } from "./user.controller";

const router = Router();

router.post("/register", createUsers);
router.get("/", getAllUsers);

export const userRouter = router;
