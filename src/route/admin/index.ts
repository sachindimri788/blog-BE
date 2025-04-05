import express from "express";
import blog from "./blog";
import auth from "./auth";
import verifyTokenWithRoles from "../../middleware/tokenVerificationMiddleware";
import { userRole } from "../../utils/constant";

// /api/v1/admin
const router = express.Router();

router.use("/blog", verifyTokenWithRoles([userRole.ADMIN]), blog);
router.use("/auth", auth);

export default router;
