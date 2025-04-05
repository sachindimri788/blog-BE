import { tokenType } from "../utils/constant";

export type AccountRoleType = "USER" | "ADMIN";
export type TokenType = (typeof tokenType)[keyof typeof tokenType];
