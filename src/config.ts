import * as dotenv from "dotenv";

dotenv.config();

const config = {
  APP_PORT: process.env.APP_PORT || 3001,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
};

export default config as typeof config;
