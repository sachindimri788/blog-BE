import { Request, Response, NextFunction } from "express";
import { createErrorResponse } from "../utils/response";
import { verifyJwtToken } from "../libs/Jwt";

/**
 * Middleware to verify a JSON Web Token (JWT) and check if the user's role
 * is included in the required roles list. If no roles are provided, it simply verifies the token.
 */
export const verifyTokenWithRoles = (requiredRoles?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return createErrorResponse({
        res,
        message: "Unauthorized",
        statusCode: 401,
      });
    }

    // Extract the token after "Bearer"
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = await verifyJwtToken(token);
    if (!decoded || decoded.type !== "bearer") {
      return createErrorResponse({
        res,
        message: "Unauthorized",
        statusCode: 401,
      });
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
        statusCode: 403,
      });
    }

    req.user = decoded;
    return next();
  };
};

export default verifyTokenWithRoles;
