import express from "express";
import "dotenv/config";
import connection from "./config/db.js";
import userRouter from "./routes/users.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import cookieParser from "cookie-parser";
import authenticate from "./middlewares/authenticate.middleware.js";
import bookRouter from "./routes/books.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users/", userRouter);

app.use(authenticate);

app.use("/api/books", bookRouter);

app.use(errorHandler);

const port = process.env.PORT || 8080;

app.listen(port, async () => {
  try {
    await connection(process.env.DBURL);
    console.log("connected to database!");
    console.log(`server is listening on port: ${port}!`);
  } catch (error) {
    console.error("error in connecting to database!");
  }
});
