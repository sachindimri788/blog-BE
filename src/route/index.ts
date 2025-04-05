import express from "express";
import admin from "./admin/index";
import user from "./user/index";

// /api/
const router = express.Router();

router.use("/v1/admin", admin);
router.use("/v1/user", user);

export default router;
