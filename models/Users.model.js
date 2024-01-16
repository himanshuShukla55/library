import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "Name should atleast have 2 charactes"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "VIEW_ALL",
    enum: ["CREATOR", "VIEW_ALL"],
  },
});

const UserModel = model("user", UserSchema);

export default UserModel;
