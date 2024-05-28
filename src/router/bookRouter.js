import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import {
  getABookById,
  getAllBooks,
  insertBook,
} from "../modal/book/bookModel.js";
import { newBooksValidation } from "../middlewares/joiValidation.js";

const router = express.Router();

//========public controllers

//create new user //public

router.post("/", auth, isAdmin, newBooksValidation, async (req, res, next) => {
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

export default router;
