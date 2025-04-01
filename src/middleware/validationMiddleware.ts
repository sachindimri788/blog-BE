import { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { createErrorResponse } from "../utils/response";

/**
 * Middleware to validate request data against a Zod schema.
 *
 * This middleware validates the request body against a Zod schema.
 * If the request data does not match the schema, it sends a 400 Bad Request response
 * with an error message detailing the validation failure.
 * If the request data is valid, it attaches the validated data to the request object
 * under the 'value' property for further processing by downstream middleware or route handlers.
 *
 * @function validateRequest
 * @param {ZodSchema<T>} schema - The Zod schema used to validate the request body.
 * @returns {Function} - A middleware function that handles request validation.
 * */
export const validateRequest = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = schema.parse(req.body);
      req.body = value;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return createErrorResponse({
          res,
          message: error.errors.map((e) => e.message).join(", "),
        });
      }
      next(error);
    }
  };
};
