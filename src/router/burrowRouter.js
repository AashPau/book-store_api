import express from "express";
import { newBurrowValidation } from "../middlewares/joiValidation.js";
import {
  getAllBurrows,
  insertBurrow,
  updateABurrowById,
} from "../modal/burrow/burrowModal.js";
import { updateABookById } from "../modal/book/bookModel.js";

const router = express.Router();

//========public controllers

//create new book /private
const maxBurrowingDays = 15;

router.post("/", newBurrowValidation, async (req, res, next) => {
  try {
    console.log("posting a new borrow");
    const today = new Date();
    const { _id, fName } = req.userInfo;

    const expectedAvailable = today.setDate(
      today.getDate() + maxBurrowingDays,
      "day"
    );

    const burrow = await insertBurrow({
      ...req.body,
      userId: _id,
      userName: fName,
      dueDate: expectedAvailable,
    });
    //if burrow successful
    //update the book table , is Available =>false

    if (burrow) {
      await updateABookById(req.body.bookId, {
        isAvailable: false,
        expectedAvailable,
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
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { _id, role } = req.userInfo;
    console.log(_id);
    const burrows = (await getAllBurrows({ userId: _id })) || [];
    //if burrow successful
    //update the book table , is Available =>false

    return res.json({
      status: "success",
      message: "",
      burrows,
    });
  } catch (error) {
    next(error);
  }
});
router.put("/", async (req, res, next) => {
  try {
    if (!req.body._id || !req.body.bookId) {
      throw new Error("Invalid data");
    }
    // update burrow table
    const burrow = await updateABurrowById(req.body._id, {
      isReturned: true,
      returnedDate: Date(),
    });

    // update book table
    const book = await updateABookById(req.body.bookId, {
      isAvailable: true,
      expectedAvailable: null,
    });

    if (burrow?._id && book?._id) {
      return res.json({
        status: "success",
        message: "Your have successfull returned the book",
      });
    }

    res.json({
      status: "error",
      message: "Unable to process your request, pelase contact Admin asap",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
