import { UserRoleType } from "../types";

export const userRole: Record<string, UserRoleType> = {
  USER: "user",
  ADMIN: "admin",
} as const; // 'as const' to make it a readonly tuple

export const tokenType = {
  BEARER: "bearer",
} as const; // 'as const' to make it a readonly tuple
