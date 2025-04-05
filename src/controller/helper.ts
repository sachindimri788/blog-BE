import {
  addRefreshToken,
  deleteRefreshToken,
  getRefreshTokens,
} from "../model/Auth";
import { hashString, verifyHashedString } from "../libs/Bcrypt";
import { AccountRoleType } from "../types";
import { generateToken } from "../libs/Jwt";
import config from "../config";
import { tokenType } from "../utils/constant";

const {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY_MILLIS,
} = config;

/**
 * Generates access and refresh tokens for a user, hashes the refresh token,
 * and saves it to the database.
 *
 * @param {Object} params - User details for token generation.
 * @param {string} params.id - The user's unique identifier.
 * @param {AccountRoleType} params.role - The user's role.
 * @param {string} params.email - The user's email address.
 * @param {string} params.name - The user's name.
 * @returns {Promise<{ accessToken: string; refreshToken: string } | null>}
 * An object containing the access and refresh tokens, or null if an error occurs.
 * @throws {Error} If token generation, hashing, or saving fails.
 */
export const generateAndSaveTokens = async ({
  id,
  role,
  email,
  name,
}: {
  id: string;
  role: AccountRoleType;
  email: string;
  name: string;
}): Promise<{ accessToken: string; refreshToken: string } | null> => {
  try {
    // Generate tokens
    const accessToken = generateToken({
      userInfo: { id, email, role, name, type: tokenType.BEARER },
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = generateToken({
      userInfo: { id, email, role, name, type: tokenType.REFRESH },
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });

    if (!accessToken || !refreshToken) {
      throw new Error("Token generation failed");
    }

    // Hash the refresh token
    const hashedRefreshToken = await hashString(refreshToken);
    if (!hashedRefreshToken) {
      throw new Error("Hashing refresh token failed");
    }

    const expiresAt = new Date(
      Date.now() + Number(REFRESH_TOKEN_EXPIRY_MILLIS)
    );

    const tokenSaved = await addRefreshToken({
      refresh_token: hashedRefreshToken,
      account_id: id,
      role: role,
      expires: expiresAt,
    });

    if (!tokenSaved) {
      throw new Error("Failed to save refresh token");
    }

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Error generating tokens: " + error);
  }
};

/**
 * Handles the refresh token process for a user by validating the provided token,
 * deleting the old token, and ensuring security.
 *
 * @param {string} accountId - The user's unique identifier.
 * @param {string} rawToken - The raw refresh token provided by the user.
 * @returns {Promise<boolean>} True if the process succeeds, otherwise throws an error.
 * @throws {Error} If no tokens are found, the token is invalid, or deletion fails.
 */
export const handleRefreshToken = async (
  accountId: string,
  rawToken: string
): Promise<boolean> => {
  try {
    // Fetch all tokens for the specified user type
    const accountTokens = await getRefreshTokens({ account_id: accountId });
    if (!accountTokens || accountTokens.length === 0) {
      throw new Error("No tokens found for this user");
    }

    // Find the matching token by comparing the hashed value
    const matchingToken = await Promise.all(
      accountTokens.map(async (dbToken) => {
        const isMatch = await verifyHashedString(
          rawToken,
          dbToken.refresh_token
        );
        return isMatch ? dbToken : null;
      })
    ).then((results) => results.find((token) => token !== null));

    if (!matchingToken) {
      throw new Error("Invalid refresh token");
    }

    // Delete the existing refresh tokens for the user
    const deleteResult = await deleteRefreshToken({
      refresh_token: matchingToken.refresh_token,
    });
    if (!deleteResult) {
      throw new Error("Failed to delete old refresh token");
    }
    return true;
  } catch (error) {
    throw new Error("Error handling refresh token: " + error);
  }
};
