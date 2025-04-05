import { Router } from "express";
import { asyncErrorHandler } from "../../utils/errorHandler";
import { validateRequest } from "../../middleware/validationMiddleware";
import { loginSchema } from "../../validation";
import { adminLogin } from "../../controller/auth";

// /api/v1/admin/auth/
const router = Router();

// This route is used to login as an admin user
router.post(
  "/login",
  validateRequest(loginSchema),
  asyncErrorHandler(adminLogin)
);

export default router;
