import express from "express";
import blog from "./blog";
import auth from "./auth";
const router = express.Router();

router.use("/v1/blog", blog);
router.use("/v1/auth", auth);
export default router;
