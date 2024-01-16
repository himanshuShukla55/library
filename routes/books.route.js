import { Router } from "express";
import {
  addBook,
  deleteBook,
  editBook,
  getBooks,
} from "../controllers/books.controller.js";
import permit from "../middlewares/permit.middleware.js";

const bookRouter = Router();

bookRouter.post("/", permit("CREATOR"), addBook);
bookRouter.put("/edit/:id", permit("CREATOR"), editBook);
bookRouter.delete("/delete/:id", permit("CREATOR"), deleteBook);
bookRouter.get("/", getBooks);

export default bookRouter;
