import express from "express";
import blog from "./blog";

const router = express.Router();

// /api/v1/user
router.use("/blog", blog);

export default router;
