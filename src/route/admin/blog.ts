import { Router } from "express";
import { asyncErrorHandler } from "../../utils/errorHandler";
import {
  addBlog,
  addManyBlogs,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../../controller/blog";
import { validateRequest } from "../../middleware/validationMiddleware";
import { blogSchema, blogsSchema, blogUpdateSchema } from "../../validation";

// /api/v1/admin/blog/
const router = Router();

// This route is used to add a new blog post
router.post("/", validateRequest(blogSchema), asyncErrorHandler(addBlog));

// This route is used to add blog in bulk
router.post(
  "/bulk",
  validateRequest(blogsSchema),
  asyncErrorHandler(addManyBlogs)
);

// This route is used to update an existing blog post
router.put(
  "/:id",
  validateRequest(blogUpdateSchema),
  asyncErrorHandler(updateBlog)
);

// This route is used to delete a blog post by its ID
router.delete("/:id", asyncErrorHandler(deleteBlog));

// This route is used to get a blog post by its ID
router.get("/:id", asyncErrorHandler(getBlogById));

// This route is used to get all blog posts
router.get("/", asyncErrorHandler(getAllBlogs));

export default router;
