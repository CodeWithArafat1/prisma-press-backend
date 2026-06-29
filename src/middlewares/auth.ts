import { NextFunction, Request, Response } from "express";
import { Role } from "../generated/prisma/enums";
import catchAsync from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";



export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers?.authorization?.startsWith("Bearer")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new Error(
        "You are not logged in. Please login to access this resource",
      );
    }

    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (verifiedToken.success === false) {
      throw new Error(verifiedToken.error);
    }

    const { id, name, email, role } = verifiedToken.data;

    if (requiredRoles.length && !requiredRoles.includes(role as Role)) {
      throw new Error(
        "Forbidden : You don't have permission to access this resource!",
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        id,
        name,
        email,
        role: role as Role,
      },
    });

    if (!user) {
      throw new Error("User not found. Please login again.");
    }

    if (user.activeStatus === "INACTIVE") {
      throw new Error(
        "Your account has been inactive. Please contact support!",
      );
    }

    req.user = {
      id,
      name,
      email,
      role,
    };

    next();
  });
};


