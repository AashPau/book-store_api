import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { insertBook } from "../modal/book/bookModel.js";
import { newBooksValidation } from "../middlewares/joiValidation.js";

const router = express.Router();

//========public controllers

//create new user //public

router.post("/", auth, isAdmin, newBooksValidation, async (req, res, next) => {
  try {
    const book = await insertBook(req.body);
    vook?._id
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
    next(error);
  }
});

export default router;
