import { Router } from "express";
import { asyncErrorHandler } from "../utils/errorHandler";
import { addBlog } from "../controller/blog";
import verifyTokenWithRoles from "../middleware/tokenVerificationMiddleware";
import { validateRequest } from "../middleware/validationMiddleware";
import { blogSchema } from "../validation";

const router = Router();

router.post(
  "/",
  verifyTokenWithRoles([]),
  validateRequest(blogSchema),
  asyncErrorHandler(addBlog)
);

export default router;
