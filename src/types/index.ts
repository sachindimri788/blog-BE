import { tokenType } from "../utils/constant";

export type UserRoleType = "user" | "admin";
export type TokenType = (typeof tokenType)[keyof typeof tokenType];
