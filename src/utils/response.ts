import { Response } from "express";
import { globalResponse } from "./responseMessage";

/**
 * Creates a standardized success response object.
 *
 * @template T - The type of the data being returned.
 * @param {Object} params - The parameters for the success response.
 * @param {Response} params.res - The Express response object.
 * @param {string} [params.message=globalResponse.SUCCESS] - The success message.
 * @param {T} [params.data] - The data to include in the response.
 * @returns {Response} - The Express response object with the success response.
 */
export function createSuccessResponse<T>({
  res,
  message = globalResponse.SUCCESS,
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

/**
 * Creates a standardized error response object.
 *
 * @param {Object} params - The parameters for the error response.
 * @param {Response} params.res - The Express response object.
 * @param {string} [params.message=globalResponse.ERROR] - The error message.
 * @param {number} [params.statusCode=400] - The HTTP status code for the error.
 * @returns {Response} - The Express response object with the error response.
 */
export function createErrorResponse({
  res,
  message = globalResponse.ERROR,
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
