import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createErrorResponse } from "./response";

// Global error handler
export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const serverErrorResponse = {
    status: false,
    message: "Internal Server Error",
  };
  console.log(err);
  res.status(500).json(serverErrorResponse);
  next();
};

// Async error handler
export const asyncErrorHandler = (
  func: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err) => {
      console.log(err);
      if (err instanceof PrismaClientKnownRequestError) {
        return handlePrismaError(res, err);
      }
      next(err);
    });
  };
};

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
