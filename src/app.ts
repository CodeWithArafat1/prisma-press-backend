import express from "express";
import cors from "cors";
import config from "./config";
import { userRouter } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import cookieParser from "cookie-parser";
import { postRoutes } from "./modules/post/post.routes";
import { commentRoutes } from "./modules/comment/comment.routes";

const app = express();
app.use(
  cors({
    origin: [
      config.app_url as string,
      "http://localhost:3000",
      "http://localhost:5173",
    ].filter(Boolean),
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// create a new user
app.use("/api/users", userRouter);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

export default app;
