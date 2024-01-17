import { Router } from "express";
import {
  addBook,
  deleteBook,
  editBook,
  getBooks,
} from "../controllers/books.controller.js";
import permit from "../middlewares/permit.middleware.js";

const bookRouter = Router();

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                  type: string
 *                  description: The Book's name.
 *                  example: The Alchemist
 *     responses:
 *       201:
 *         description: CREATED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  description: response sucess or failure
 *                  example: true,
 *                 message:
 *                  type: String
 *                  description: success of failure message
 *                  example: Book added!,
 *       403:
 *         description: FORBIDDEN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  description: response sucess or failure
 *                  example: false,
 *                 message:
 *                  type: String
 *                  description: success of failure message
 *                  example: Forbidden!,
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  description: response sucess or failure
 *                  example: false,
 *                 message:
 *                  type: String
 *                  description: success of failure message
 *                  example: Bad request!,
 */
bookRouter.post("/", permit("CREATOR"), addBook);

/**
 * @swagger
 * /api/books/edit/:bookID:
 *   put:
 *     summary: Edit a book.
 *     parameters:
 *       - in: path
 *         name: bookID
 *         required: true
 *         description: String ID of the book to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                  type: string
 *                  description: The Book's name.
 *                  example: The Alchemist
 *     responses:
 *       202:
 *         description: ACCEPTED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  description: response sucess or failure
 *                  example: true,
 *                 message:
 *                  type: String
 *                  description: success of failure message
 *                  example: Book updated!,
 *       403:
 *         description: FORBIDDEN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  description: response sucess or failure
 *                  example: false,
 *                 message:
 *                  type: String
 *                  description: success of failure message
 *                  example: Forbidden!,
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  description: response sucess or failure
 *                  example: false,
 *                 message:
 *                  type: String
 *                  description: success of failure message
 *                  example: Bad request!,
 */
bookRouter.put("/edit/:id", permit("CREATOR"), editBook);

/**
 * @swagger
 * /api/books/delete/:bookID:
 *   delete:
 *     summary: Delete a book.
 *     parameters:
 *       - in: path
 *         name: bookID
 *         required: true
 *         description: String ID of the book to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ACCEPTED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  description: response sucess or failure
 *                  example: true,
 *                 message:
 *                  type: String
 *                  description: success of failure message
 *                  example: Book deleted!,
 *       403:
 *         description: FORBIDDEN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  description: response sucess or failure
 *                  example: false,
 *                 message:
 *                  type: String
 *                  description: success of failure message
 *                  example: Forbidden!,
 */
bookRouter.delete("/delete/:id", permit("CREATOR"), deleteBook);

/**
 * @swagger
 * /api/books/?new=?old=?sort=?:
 *   get:
 *     summary: Get Books.
 *     parameters:
 *       - in: path
 *         name: new
 *         description: query parameter to select books created within 10 minutes.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: old
 *         description: query parameter to select books created before 10 minutes.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: sort
 *         description: query parameter to sort books based on createdAt.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ACCEPTED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  description: response sucess or failure
 *                  example: true,
 *                 message:
 *                  type: String
 *                  description: success of failure message
 *                  example: Book deleted!,
 *                 data:
 *                   type: array
 *                   description : list of books
 *                   example : [{_id, name:, createdAt: }]
 */
bookRouter.get("/", getBooks);

export default bookRouter;
