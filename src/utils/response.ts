import { Response } from "express";

// Creates a standardized success response object.
export function createSuccessResponse<T>({
  res,
  message = "Success",
  data,
}: {
  res: Response;
  message?: string;
  data?: T;
}) {
  return res.status(200).json({
    status: true,
    message,
    data,
  });
}

// Creates a standardized error response object.
export function createErrorResponse({
  res,
  message = "An error occurred",
  statusCode = 400,
}: {
  res: Response;
  message?: string;
  statusCode?: number;
}) {
  return res.status(statusCode).json({
    status: false,
    message,
  });
}
