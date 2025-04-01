import * as dotenv from "dotenv";

dotenv.config();

const config = {
  APP_PORT: process.env.APP_PORT || 3001,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
};

export default config as typeof config;
