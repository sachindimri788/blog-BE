import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { TokenType, UserRoleType } from "../types";
import config from "../config";

const secretKey: Secret = config.JWT_PRIVATE_KEY as Secret;

/**
 * Interface representing the payload of a JWT token.
 */
export interface JwtPayload {
  id?: string; // User ID
  email?: string; // User email
  role?: UserRoleType; // User role
  type: TokenType; // Token type
}

/**
 * Generates a JWT token.
 *
 * @param {JwtPayload} userInfo - The payload to include in the token.
 * @param {string} [expiresIn="1h"] - The expiration time of the token.
 * @returns {string | null} The generated JWT token or null if an error occurs.
 */
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

/**
 * Verifies the validity of a JWT token.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {JwtPayload | null} The decoded payload if the token is valid, or null if invalid.
 */
export const verifyJwtToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, secretKey) as JwtPayload;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
};
