import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { newBurrowValidation } from "../middlewares/joiValidation.js";
import { insertBurrow } from "../modal/burrow/burrowModal.js";
import { updateABookById } from "../modal/book/bookModel.js";

const router = express.Router();

//========public controllers

//create new book /private
const maxBurrowingdays = 15;

router.post("/", newBurrowValidation, async (req, res, next) => {
  try {
    const today = new Date();
    const { _id, fName } = user.userInfo;
    const book = await insertBurrow({
      ...req.body,
      userId: _id,
      userName: fName,
    });
    //if burrow successful
    //update the book table , is Available =>false

    if (burrow) {
      await updateABookById(req.body.bookId, {
        isAvailable: false,
        expectedAvailable: today.setDate(
          today.getDate() + maxBurrowingdays,
          "day"
        ),
      });
      return res.json({
        status: "success",
        message: "book is available in your account",
      });
    }

    res.json({
      status: "error",
      message: "unable to burrow book try again later",
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

export default router;
