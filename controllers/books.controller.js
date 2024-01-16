import BookeModel from "../models/Books.model.js";

//function to add a new book
export const addBook = async (req, res, next) => {
  try {
    await BookeModel.create({ ...req.body, user: req.userAuth.userId });
    res.status(201).json({
      success: true,
      message: "book added!",
    });
  } catch (error) {
    console.error("error in adding book!", error);
    next(error);
  }
};

//function to edit a book
export const editBook = async (req, res, next) => {
  try {
    await BookeModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(202).json({
      success: true,
      message: "book updated!",
    });
  } catch (error) {
    console.error("error in updating book!", error);
    next(error);
  }
};

//function to delete a book
export const deleteBook = async (req, res, next) => {
  try {
    await BookeModel.findByIdAndDelete(req.params.id, req.body);
    res.status(202).json({
      success: true,
      message: "book deleted!",
    });
  } catch (error) {
    console.error("error in deleting book!", error);
    next(error);
  }
};

//function to get books
export const getBooks = async (req, res, next) => {
  try {
    //* populate the conditions depending on user role and search queries
    const conditions = {};
    if (req.userAuth.userRole === "CREATOR")
      conditions.user = req.userAuth.userId;
    if (+req.query.old === 1)
      conditions.createdAt = { $lte: new Date(Date.now() - 10 * 60 * 1000) };
    if (+req.query.new === 1)
      conditions.createdAt = { $gt: new Date(Date.now() - 10 * 60 * 1000) };
    const startIndex = req.query.startIndex || 0;
    const order = req.query.order || 1;

    //return 10 books sorted in ascending order of createdAt
    const books = await BookeModel.find(conditions)
      .skip(startIndex)
      .limit(10)
      .sort({ createdAt: 1 });

    //* return the books
    res.status(200).json({
      success: true,
      message: "get books sucessful!",
      data: books,
    });
  } catch (error) {
    console.log("error in getting books!", error);
    next(error);
  }
};
