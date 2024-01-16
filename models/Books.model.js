import { Schema, model } from "mongoose";

const BookSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [2, "Book name should atleast have 2 characters!"],
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BookeModel = model("book", BookSchema);
export default BookeModel;
