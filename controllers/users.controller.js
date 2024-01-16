import UserModel from "../models/Users.model.js";
import customError from "../utils/customError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//function to handle user signup
export const signUp = async (req, res, next) => {
  try {
    const { password } = req.body;

    //! if the password is less than 8 characters abort signup
    if (!password || password.length < 8)
      customError(404, "Password should be atleast 8 characters long!");

    //* hash the password and save new user document.
    const hash = bcrypt.hashSync(password, 5);
    await UserModel.create({ ...req.body, password: hash });
    res.status(201).json({
      success: true,
      message: "sign up successful!",
    });
  } catch (error) {
    console.error("error in user signup", error);
    next(error);
  }
};

//function to handle user login
export const login = async (req, res, next) => {
  try {
    //* find the user with the given email
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) customError("401", "Invalid credentials!");

    //* if use exists then compare the passwords
    const result = bcrypt.compareSync(password, user.password);
    if (!result) customError("401", "Invalid Credentials!");

    //* if passwords match then generate auth token and send user data.
    const authToken = jwt.sign(
      { userId: user._id, userRole: user.role },
      process.env.USER_SECRET
    );
    const { password: userPasswoed, ...data } = user._doc;
    res.status(200).cookie("token", authToken).json({
      success: true,
      message: "login successful!",
      data,
    });
  } catch (error) {
    console.error("error in user login!", error);
    next(error);
  }
};
