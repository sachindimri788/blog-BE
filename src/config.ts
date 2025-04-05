import * as dotenv from "dotenv";

dotenv.config();

const config = {
  APP_PORT: process.env.APP_PORT || 3001,
  DATABASE_URL: process.env.DATABASE_URL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  TOKEN_PRIVATE_KEY: process.env.TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY_MILLIS: process.env.REFRESH_TOKEN_EXPIRY_MILLIS,
};

export default config as typeof config;
