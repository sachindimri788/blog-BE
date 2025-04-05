import { Router } from "express";
import { asyncErrorHandler } from "../../utils/errorHandler";
import { getActiveBlogs } from "../../controller/blog";

// /api/v1/user/blog/
const router = Router();

// This route is used to get all active blog posts
router.get("/", asyncErrorHandler(getActiveBlogs));

export default router;
