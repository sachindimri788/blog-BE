import { Request, Response } from "express";
import { createErrorResponse, createSuccessResponse } from "../utils/response";
import config from "../config";
import { authResponseMessage, globalResponse } from "../utils/responseMessage";
import { accountRole } from "../utils/constant";
import { generateAndSaveTokens, handleRefreshToken } from "./helper";
import { verifyJwtToken } from "../libs/Jwt";

// Handles admin login by validating credentials and generating a token.
export const adminLogin = async (req: Request, res: Response) => {
  const actualPassword = config.ADMIN_PASSWORD!;
  const actualEmail = config.ADMIN_EMAIL!;
  const { email, password } = req.body;

  // Check if the email and password match the actual credentials
  if (email !== actualEmail || password !== actualPassword) {
    return createErrorResponse({
      res,
      message: authResponseMessage.INVALID_CREDENTIALS,
    });
  }

  // generate a token for the admin user
  const tokens = await generateAndSaveTokens({
    id: actualEmail,
    role: accountRole.ADMIN,
    email: actualEmail,
    name: "Admin",
  });

  if (!tokens) {
    return createErrorResponse({
      res,
    });
  }

  return createSuccessResponse({
    res,
    data: { email, tokens },
    message: authResponseMessage.LOGIN_SUCCESSFUL,
  });
};

// exchange the refresh token for a new access token
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshtoken: refreshToken } = req.headers as {
    refreshtoken: string;
  };
  if (!refreshToken) {
    return createErrorResponse({
      res,
      message: authResponseMessage.UNAUTHORIZED_ACCESS,
      statusCode: 401,
    });
  }

  const { ADMIN_EMAIL } = config;

  // verify the refresh token
  const decoded = await verifyJwtToken(refreshToken);
  if (!decoded || decoded.type !== "refresh" || !decoded.id) {
    return createErrorResponse({
      res,
      message: authResponseMessage.UNAUTHORIZED_ACCESS,
      statusCode: 401,
    });
  }

  const refreshTokenValidationResult = await handleRefreshToken(
    decoded.id,
    refreshToken
  );
  if (!refreshTokenValidationResult) {
    return createErrorResponse({
      res,
      message: authResponseMessage.UNAUTHORIZED_ACCESS,
      statusCode: 401,
    });
  }

  // verify the refresh token and generate a new access token
  const tokens = await generateAndSaveTokens({
    id: ADMIN_EMAIL!,
    role: accountRole.ADMIN,
    email: ADMIN_EMAIL!,
    name: "Admin",
  });
  if (!tokens) {
    return createErrorResponse({
      res,
      message: authResponseMessage.UNAUTHORIZED_ACCESS,
      statusCode: 401,
    });
  }

  return createSuccessResponse({
    res,
    data: tokens,
    message: globalResponse.SUCCESS,
  });
};
