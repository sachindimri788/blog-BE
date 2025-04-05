import { Request, Response, NextFunction } from "express";
import { createErrorResponse } from "../utils/response";
import { verifyJwtToken } from "../libs/Jwt";
import { authResponseMessage } from "../utils/responseMessage";

/**
 * Middleware to verify a JSON Web Token (JWT) and optionally check if the user's role
 * is included in the required roles list. If no roles are provided, it simply verifies the token.
 *
 * @param {string[]} [requiredRoles] - An optional array of roles that the user must have to access the route.
 * @returns {Function} An Express middleware function.
 */
export const verifyTokenWithRoles = (requiredRoles?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    /**
     * Extract the Authorization header and validate its format.
     * If the header is missing or invalid, respond with a 401 Unauthorized error.
     */
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return createErrorResponse({
        res,
        message: authResponseMessage.UNAUTHORIZED_ACCESS,
        statusCode: 401,
      });
    }

    try {
      // Extract the token after "Bearer"
      const token = authHeader.split(" ")[1];

      /**
       * Verify the decoded token and ensure it has the correct type.
       * If verification fails, respond with a 401 Unauthorized error.
       */
      const decoded = await verifyJwtToken(token);
      if (!decoded || decoded.type !== "bearer") {
        return createErrorResponse({
          res,
          message: authResponseMessage.UNAUTHORIZED_ACCESS,
          statusCode: 401,
        });
      }

      // If no roles are required, simply proceed to the next middleware
      if (!requiredRoles || requiredRoles.length === 0) {
        req.user = decoded;
        return next();
      }

      /**
       * If roles are specified, check if the user's role matches one of the required roles.
       * If the user's role is insufficient, respond with a 403 Forbidden error.
       */
      const accountRole = decoded?.role;
      if (!accountRole || !requiredRoles.includes(accountRole)) {
        return createErrorResponse({
          res,
          message: authResponseMessage.INSUFFICIENT_ROLE,
          statusCode: 403,
        });
      }

      req.user = decoded;
      return next();
    } catch (error) {
      console.error("Token verification error:", error);
      // Handle unexpected errors during token verification
      return createErrorResponse({
        res,
        message: authResponseMessage.UNAUTHORIZED_ACCESS,
        statusCode: 401,
      });
    }
  };
};

export default verifyTokenWithRoles;
