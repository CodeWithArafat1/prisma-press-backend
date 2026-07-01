import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { UserPayload } from "./user.interface";

// create a new user into db
export const createUserIntoDB = async (payload: UserPayload) => {
  const { name, email, password, profilePhoto } = payload;
  const isUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExists) {
    throw new Error("User already exists");
  }

  const hashPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      profile: {
        create: {
          profilePhoto,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createUser.id,
      email: createUser.email || email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

// get all users from db
export const getAllUsersFromDB = async () => {
  const users = await prisma.user.findMany({
    omit: {
      password: true,
    },
  });
  return users;
};

// getMyProfile
export const getMyProfileIntoDB = async (userId: string) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { id: userId },
      omit: {
        password: true,
      },
      include: {
        profile: true,
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateMyProfileIntoDB = async (userId: string, payload: any) => {
  try {
    const { name, email, profilePhoto, bio } = payload;

    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        profile: {
          update: {
            profilePhoto,
            bio,
          },
        },
      },
      omit: {
        password: true,
      },
      include: {
        profile: true,
      },
    });

    return updateUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
