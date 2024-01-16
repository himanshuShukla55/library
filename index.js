import express from "express";
import "dotenv/config";
import morgan from "morgan";
import fs from "fs";
import connection from "./config/db.js";
import userRouter from "./routes/users.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import cookieParser from "cookie-parser";
import authenticate from "./middlewares/authenticate.middleware.js";
import bookRouter from "./routes/books.route.js";

const app = express();

const accessLogStream = fs.createWriteStream("./access.log", { flags: "a" });
const port = process.env.PORT || 8080;

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users/", userRouter);

app.use(authenticate);

app.use("/api/books", bookRouter);

app.use(errorHandler);

app.listen(port, async () => {
  try {
    await connection(process.env.DBURL);
  } catch (error) {}
});
