import { Router } from "express";
import { login, signUp } from "../controllers/users.controller.js";

const userRouter = Router();

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Leanne Graham
 *               email:
 *                  type: string
 *                  description: The user's email.
 *                  example: alex@gmail.com
 *               password:
 *                  type: string
 *                  description : The user's password.
 *                  example: Alex@14
 *               role:
 *                  type: string,
 *                  description : The user's role
 *                  example: VIEW_ALL
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
 *                  example: sign up successful!,
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
 *                  example: Password should be atleast 8 characters long!,
 */
userRouter.post("/signup", signUp);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *                  description: The user's email.
 *                  example: alex@gmail.com
 *               password:
 *                  type: string
 *                  description : The user's password.
 *                  example: Alex@14
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
 *                  example: login successful!!,
 *       401:
 *         description: UNAUTHORIZED
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
 *                  example: Invalid credentials!,
 */
userRouter.post("/login", login);

export default userRouter;
