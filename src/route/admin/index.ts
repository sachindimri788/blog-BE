import express from "express";
import blog from "./blog";
import auth from "./auth";
import verifyTokenWithRoles from "../../middleware/tokenVerificationMiddleware";
import { accountRole } from "../../utils/constant";

// /api/v1/admin
const router = express.Router();

router.use("/blog", verifyTokenWithRoles([accountRole.ADMIN]), blog);
router.use("/auth", auth);

export default router;
