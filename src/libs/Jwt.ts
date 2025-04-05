import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { TokenType, AccountRoleType } from "../types";
import config from "../config";

const jwtSecret: Secret = config.TOKEN_PRIVATE_KEY as Secret;

/**
 * Interface representing the payload of a JWT token.
 */
export interface JwtPayload {
  id?: string; // User ID
  email?: string; // User email
  role?: AccountRoleType; // User role
  name?: string; // User name
  type: TokenType; // Token type
}

/**
 * Generates a JWT token.
 *
 * @param {object} params - The parameters for token generation.
 * @param {JwtPayload} params.userInfo - The payload to include in the token.
 * @param {string} [params.expiresIn="1h"] - The expiration time of the token.
 * @param {Secret} [params.secretKey=config.TOKEN_PRIVATE_KEY] - The secret key for signing the token.
 * @returns {string | null} The generated JWT token or null if an error occurs.
 */
export const generateToken = ({
  userInfo,
  expiresIn = "1h",
  secretKey = jwtSecret,
}: {
  userInfo: JwtPayload;
  expiresIn?: string;
  secretKey?: Secret;
}): string | null => {
  try {
    const options: SignOptions = {
      expiresIn: expiresIn as SignOptions["expiresIn"],
    };
    return jwt.sign(userInfo, secretKey, options);
  } catch (error) {
    console.error("JWT Generation Error:", error);
    throw new Error("Token generation failed");
  }
};

/**
 * Verifies the validity of a JWT token.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {JwtPayload | null} The decoded payload if the token is valid, or null if invalid.
 */
export const verifyJwtToken = (
  token: string,
  secretKey = jwtSecret
): JwtPayload | null => {
  try {
    return jwt.verify(token, secretKey) as JwtPayload;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    throw new Error("Token verification failed");
  }
};
