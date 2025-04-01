import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.use("/", (req: Request, res: Response) => {
  res.status(200).send("API is running!");
});

export default router;
