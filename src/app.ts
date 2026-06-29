import express from "express";
import cors from "cors";
import config from "./config";
import { userRouter } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import cookieParser from "cookie-parser";


const app = express();
app.use(
  cors({
    origin: config.app_url, // Allow requests from the specified app URL
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// create a new user
app.use("/api/users", userRouter);
app.use('/api/auth', authRoutes)

export default app;
