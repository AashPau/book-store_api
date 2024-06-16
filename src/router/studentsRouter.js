import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { getAllUser } from "../modal/user/userModel.js";

const router = express.Router();

//get all users || students
router.get("/", auth, isAdmin, async (req, res, next) => {
  try {
    const students = await getAllUser();
    res.json({ status: "success", students });
  } catch (error) {
    next(error);
  }
});

export default router;
