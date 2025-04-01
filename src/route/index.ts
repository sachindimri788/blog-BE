import express from "express";
import blog from "./blog";
const router = express.Router();

router.use("/v1/blog", blog);

export default router;
