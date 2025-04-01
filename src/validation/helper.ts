import { z } from "zod";
import { convertToUTC } from "../utils/helper";

export const timeSchema = z
  .string()
  .trim()
  .refine((val) => !isNaN(new Date(val).getTime()), "Invalid time format")
  .transform((val) => (val ? convertToUTC(val) : val));

export const signUpPasswordSchema = z
  .string()
  .trim()
  .min(6, "Password should be at least 6 characters")
  .max(20, "Password should be no more than 20 characters")
  .regex(/[A-Za-z]/, "Password must contain at least one letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const confirmPasswordSchema = z
  .string()
  .trim()
  .min(1, "Confirm password is required")
  .max(20, "Confirm password should be no more than 20 characters");

export const loginPasswordSchema = z
  .string()
  .trim()
  .min(1, "Password is required")
  .max(20, "Password should be no more than 20 characters");

export const emailSchema = z.string().trim().email("Invalid email address");
