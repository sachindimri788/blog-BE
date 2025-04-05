import { Router } from "express";
import { asyncErrorHandler } from "../utils/errorHandler";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controller/blog";
import verifyTokenWithRoles from "../middleware/tokenVerificationMiddleware";
import { validateRequest } from "../middleware/validationMiddleware";
import { blogSchema, blogUpdateSchema } from "../validation";

// /api/v1/blog/
const router = Router();

// This route is used to add a new blog post
router.post(
  "/",
  verifyTokenWithRoles([]),
  validateRequest(blogSchema),
  asyncErrorHandler(addBlog)
);

// This route is used to update an existing blog post
router.put(
  "/:id",
  verifyTokenWithRoles([]),
  validateRequest(blogUpdateSchema),
  asyncErrorHandler(updateBlog)
);

// This route is used to delete a blog post by its ID
router.delete("/:id", verifyTokenWithRoles([]), asyncErrorHandler(deleteBlog));

// This route is used to get a blog post by its ID
router.get("/:id", verifyTokenWithRoles([]), asyncErrorHandler(getBlogById));

// This route is used to get all blog posts
router.get("/", verifyTokenWithRoles([]), asyncErrorHandler(getAllBlogs));

export default router;
