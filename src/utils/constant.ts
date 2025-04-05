import { AccountRoleType } from "../types";

export const accountRole: Record<string, AccountRoleType> = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const; // 'as const' to make it a readonly tuple

export const tokenType = {
  BEARER: "bearer",
  REFRESH: "refresh",
} as const; // 'as const' to make it a readonly tuple

export const pagination = {
  PAGE_NUMBER: 1,
  PAGE_SIZE: 10,
};
