import { Request, Response } from "express";
import { createSuccessResponse } from "../utils/response";

export const addBlog = async (req: Request, res: Response) => {
  const { title, summary, active, likes } = req.body;
  console.log("Request body:", req.user); // Log the request body for debugging
  return createSuccessResponse({
    res,
    data: { title, summary, active, likes },
  });
};
