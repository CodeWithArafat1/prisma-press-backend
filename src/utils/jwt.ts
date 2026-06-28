import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const createToken = (
  payload: JwtPayload,
  secret: string,
  options: SignOptions,
) => {
  const token =  jwt.sign(payload, secret, {
    expiresIn: options,
  } as SignOptions);
  return token;
};
