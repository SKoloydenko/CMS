import dotenv from "dotenv";

dotenv.config({
  path: `env/.${process.env.NODE_ENV}.env`,
});

const PORT = Number(process.env.PORT || 3000);

import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import morgan from "morgan";

import express from "express";
import fs from "fs";
import { sequelize } from "./sequelize";

import { ErrorMiddleware } from "./middlewares/error.middleware";
import router from "./router";

const app = express();

app.use(morgan(":date[web]"));
app.use(morgan("dev"));
app.use(
  morgan("combined", {
    stream: fs.createWriteStream("./server.log", { flags: "a" }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload({ defCharset: "utf8", defParamCharset: "utf8" }));
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL!],
    optionsSuccessStatus: 200,
  })
);

app.use("/api", router);

app.use(ErrorMiddleware);

async function start() {
  try {
    await sequelize.sync({ force: false });
    console.log("[OK] Connection to database is successful");

    app.listen(PORT);
    console.log(`[OK] Server is running on port ${PORT}`);
  } catch (e) {
    console.log("[ERR] Failed to connect to database:\n", e);
  }
}

start();
