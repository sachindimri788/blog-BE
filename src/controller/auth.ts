import { Request, Response } from "express";
import { createErrorResponse, createSuccessResponse } from "../utils/response";
import config from "../config";
import { generateToken } from "../libs/Jwt";

export const adminLogin = async (req: Request, res: Response) => {
  const actualPassword = config.ADMIN_PASSWORD;
  const actualEmail = config.ADMIN_EMAIL;
  const { email, password } = req.body;

  // Check if the email and password match the actual credentials
  if (email !== actualEmail || password !== actualPassword) {
    return createErrorResponse({
      res,
      message: "Invalid email or password",
    });
  }

  // generate a token for the admin user
  const token = await generateToken(
    { email, role: "admin", type: "bearer" },
    "16h"
  );
  if (!token) {
    return createErrorResponse({
      res,
      message: "Failed to generate token",
    });
  }

  return createSuccessResponse({
    res,
    data: { email, token },
  });
};
