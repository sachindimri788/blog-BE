import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { UserRoleType } from "../types";
import config from "../config";

export interface JwtPayload {
  id?: string;
  email?: string;
  role?: UserRoleType;
}

const secretKey: Secret = config.JWT_PRIVATE_KEY as Secret;

// Generates a JWT token.
export const generateToken = (
  userInfo: JwtPayload,
  expiresIn: string = "1h"
) => {
  try {
    const options: SignOptions = {
      expiresIn: expiresIn as SignOptions["expiresIn"],
    };
    return jwt.sign(userInfo, secretKey, options);
  } catch (error) {
    console.error("JWT Generation Error:", error);
    return null;
  }
};

// Verifies the validity of a JWT token.
export const verifyJwtToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, secretKey) as JwtPayload;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
};
