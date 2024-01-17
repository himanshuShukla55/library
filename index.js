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
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

const accessLogStream = fs.createWriteStream("./access.log", { flags: "a" });
const port = process.env.PORT || 8080;

//swagger setup
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Library",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It serves API endpoints to library client app.",
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: "Development server",
    },
    {
      url: `https://library-backend-cpkc.onrender.com`,
      description: "Production server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/apiDocs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//middlewares
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
