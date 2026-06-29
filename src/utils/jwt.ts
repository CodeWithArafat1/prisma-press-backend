import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export interface TokenPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

type VerifyResult =
  | { success: true; data: TokenPayload }
  | { success: false; error: string };

const createToken = (
  payload: JwtPayload,
  secret: string,
  options: SignOptions,
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: options,
  } as SignOptions);
  return token;
};

const verifyToken = (token: string, secret: string): VerifyResult => {
  try {
    const verifyToken = jwt.verify(token, secret) as TokenPayload;
    return {
      success: true,
      data: verifyToken,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const jwtUtils = {
  verifyToken,
  createToken,
};
