import { Router } from "express";
import { asyncErrorHandler } from "../../utils/errorHandler";
import { validateRequest } from "../../middleware/validationMiddleware";
import { loginSchema } from "../../validation";
import { adminLogin, refreshToken } from "../../controller/auth";

// /api/v1/admin/auth/
const router = Router();

// This route is used to login as an admin user
router.post(
  "/login",
  validateRequest(loginSchema),
  asyncErrorHandler(adminLogin)
);

// This route is used to refresh the access token using the refresh token
router.post("/refresh-token", asyncErrorHandler(refreshToken));

export default router;
