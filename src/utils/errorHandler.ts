import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createErrorResponse } from "./response";
import { globalResponse } from "./responseMessage";

/**
 * Global error handler middleware for Express.
 * Logs the error and sends a generic server error response.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const serverErrorResponse = {
    status: false,
    message: globalResponse.SERVER_ERROR,
  };
  console.log("error in globalErrorHandler: ", err);
  res.status(500).json(serverErrorResponse);
  next();
};

/**
 * Higher-order function to handle async errors in Express routes.
 * Catches errors and passes them to the next middleware.
 *
 * @param {Function} func - The async function to wrap.
 * @returns {Function} - A wrapped function with error handling.
 */
export const asyncErrorHandler = (
  func: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err) => {
      console.error("Error in asyncErrorHandler: ", err);
      if (err instanceof PrismaClientKnownRequestError) {
        return handlePrismaError(res, err);
      }
      next(err);
    });
  };
};

/**
 * Handles Prisma-specific errors and sends appropriate error responses.
 *
 * @param {Response} res - The Express response object.
 * @param {PrismaClientKnownRequestError} error - The Prisma error object.
 * @returns {Response} - The error response.
 */
export const handlePrismaError = (
  res: Response,
  error: PrismaClientKnownRequestError
) => {
  const errorMessages: Record<string, string> = {
    P2002: "Unique constraint violation",
    P2025: "Some Record Not Found",
    P2003: "Foreign key constraint violation",
    P2004: "Invalid field value",
    P2005: "Query engine error",
    P2006: "Database error",
    P2016: "Schema validation failed",
    P2021: "Invalid operation",
    P2014: "Cannot delete record due to existing references",
    P2029: "Aggregation error",
    P2030: "Record already exists",
  };

  const message = errorMessages[error.code] || "Unexpected error";
  return createErrorResponse({ res, message });
};
