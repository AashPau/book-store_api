import express from "express";

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

export default router;
