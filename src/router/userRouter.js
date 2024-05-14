import express from "express";
import { createNewUser } from "../modal/user/userModel.js";
import { hashPassword } from "../../utils/bcrypt.js";
import { newUserValidation } from "../middlewares/joiValidation.js";

const router = express.Router();

router.all("/", (req, res, next) => {
  //always executes
  console.log("from all");
  next();
});

router.get("/", (req, res) => {
  try {
    res.json({
      status: "success",
      message: "todo Get",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", newUserValidation, async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const user = await createNewUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "your account has been created successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to create an user try again later ",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.message = "Email already in use";
    }
    next(error);
  }
});

export default router;
