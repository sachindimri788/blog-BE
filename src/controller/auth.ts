import { Request, Response } from "express";
import { createErrorResponse, createSuccessResponse } from "../utils/response";
import config from "../config";
import { generateToken } from "../libs/Jwt";
import { authResponseMessage } from "../utils/responseMessage";
import { tokenType, userRole } from "../utils/constant";

// Handles admin login by validating credentials and generating a token.
export const adminLogin = async (req: Request, res: Response) => {
  const actualPassword = config.ADMIN_PASSWORD;
  const actualEmail = config.ADMIN_EMAIL;
  const { email, password } = req.body;

  // Check if the email and password match the actual credentials
  if (email !== actualEmail || password !== actualPassword) {
    return createErrorResponse({
      res,
      message: authResponseMessage.INVALID_CREDENTIALS,
    });
  }

  // generate a token for the admin user
  const token = await generateToken(
    { email, role: userRole.ADMIN, type: tokenType.BEARER },
    "16h"
  );
  if (!token) {
    return createErrorResponse({
      res,
    });
  }

  return createSuccessResponse({
    res,
    data: { email, token },
    message: authResponseMessage.LOGIN_SUCCESSFUL,
  });
};
