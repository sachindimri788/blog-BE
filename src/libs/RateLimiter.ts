import rateLimit from "express-rate-limit";

/**
 * A rate limiter middleware for Express.js to limit repeated requests to public APIs.
 *
 * @constant
 * @type {import("express-rate-limit").RateLimit}
 * @property {number} windowMs - Time window in milliseconds (10 minutes).
 * @property {number} max - Maximum number of requests allowed per windowMs.
 * @property {string} message - Message sent when the rate limit is exceeded.
 */
export const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
  message: "Too many requests from this IP, please try again after 10 minutes",
});
