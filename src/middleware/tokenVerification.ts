import { Request, Response, NextFunction } from "express";
import { createErrorResponse } from "../utils/response";
import { verifyJwtToken } from "../libs/Jwt";

/**
 * Middleware to verify a JSON Web Token (JWT) and check if the user's role
 * is included in the required roles list. If no roles are provided, it simply verifies the token.
 */
export const verifyTokenWithRoles = (requiredRoles?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    if (!token) {
      return createErrorResponse({ res, message: "Unauthorized" });
    }

    // Verify the token
    const decoded = await verifyJwtToken(token);
    if (!decoded || !decoded?.id) {
      return createErrorResponse({ res, message: "Unauthorized" });
    }

    // If no roles are required, simply proceed to the next middleware
    if (!requiredRoles || requiredRoles.length === 0) {
      req.user = decoded;
      return next();
    }

    const userRole = decoded?.role;
    if (!userRole || !requiredRoles.includes(userRole)) {
      return createErrorResponse({
        res,
        message: "Forbidden: Insufficient role",
      });
    }

    req.user = decoded;
    return next();
  };
};

export default verifyTokenWithRoles;
