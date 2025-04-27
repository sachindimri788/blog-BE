import { Router } from "express";
import { asyncErrorHandler } from "../../utils/errorHandler";
import { addLikeCommentOnBlog, getActiveBlogs } from "../../controller/blog";
import { validateRequest } from "../../middleware/validationMiddleware";
import { commentLikeUserSchema } from "../../validation";

// /api/v1/user/blog/
const router = Router();

// This route is used to get all active blog posts
router.get("/", asyncErrorHandler(getActiveBlogs));
router.put(
  "/:id",
  validateRequest(commentLikeUserSchema),
  asyncErrorHandler(addLikeCommentOnBlog)
);

export default router;
