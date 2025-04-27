import express from "express";
import config from "./config";
import { globalErrorHandler } from "./utils/errorHandler";
import cors from "cors";
import router from "./route";
import { limiter } from "./libs/RateLimiter";
import { JwtPayload } from "./libs/Jwt";

const app = express();
const port = config.APP_PORT;

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

app.set(
  "trust proxy",
  process.env.NODE_ENV !== "development" ? true : "loopback"
);

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("API is running!");
});

app.use("/api", limiter, router);
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
