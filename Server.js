import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./src/router/userRouter.js";
import bookRouter from "./src/router/bookRouter.js";
import burrowRouter from "./src/router/burrowRouter.js";
import reviewRouter from "./src/router/reviewRouter.js";
import studentsRouter from "./src/router/studentsRouter.js";

const app = express();
const port = process.env.PORT || 8000;

//connect MongoDB
import { connectMongoDB } from "./src/config/dbConfig.js";
connectMongoDB();

//middle wares
app.use(cors());
app.use(express.json());

//use morgan only for production
if (process.env.NODE_ENV !== "production") {
  //you cam leave this for the prod as well to tract the user requests
  app.use(morgan("dev"));
}

// router

import { auth } from "./src/middlewares/auth.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/burrows", auth, burrowRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/students", studentsRouter);

app.use("/", (req, res) => {
  res.json({ message: "Server running healthy" });
});

app.use("*", (req, res, next) => {
  const err = new Error("404 not found");
  err.status = 404;
  next(err);
});

//global error handler
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500);

  res.json({
    status: "error",
    message: error.message,
  });
});
app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(`port is up and running at http://localhost:${port}`);
});
