import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import {
  getABookById,
  getAllBooks,
  insertBook,
  updateABookById,
} from "../modal/book/bookModel.js";
import {
  newBookValidation,
  updateBookValidation,
} from "../middlewares/joiValidation.js";

const router = express.Router();

//========public controllers

//create new book /private

router.post("/", auth, isAdmin, newBookValidation, async (req, res, next) => {
  try {
    const book = await insertBook(req.body);
    book?._id
      ? res.json({
          status: "success",
          message: "book added",
        })
      : res.json({
          status: "error",
          message: "book not added",
        });
    console.log(req.body);
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.message = "Duplicate book";
      error.status = 200;
    }
    console.log(error);
    next(error);
  }
});

//get
router.get("/all", auth, isAdmin, async (req, res, next) => {
  try {
    const books = await getAllBooks();
    res.json({ status: "success", books });
  } catch (error) {
    next(error);
  }
});

//get
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const books = _id
      ? await getABookById(_id)
      : await getAllBooks({ status: "active" });
    res.json({ status: "success", books });
  } catch (error) {
    next(error);
  }
});

//update the book
router.put("/", auth, isAdmin, updateBookValidation, async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;
    console.log({ _id, rest });
    const newBook = await updateABookById(_id, rest);
    if (newBook?._id) {
      res.status(200).json({
        status: "success",
        message: "Book has been updated",
      });
      console.log("updated");
      next();
    } else {
      res.status(403).json({
        status: "error",
        message: "Book could not be updated",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
