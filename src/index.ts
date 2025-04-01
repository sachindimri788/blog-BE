import express from "express";
import config from "./config";
import { globalErrorHandler } from "./utils/errorHandler";
import cors from "cors";
import router from "./route";

const app = express();
const port = config.APP_PORT;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("API is running!");
});

app.use("/api", router);
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
