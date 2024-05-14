import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;

//middle wares
app.use(cors());
app.use(express.json());

//use morgan only for production
if (process.env.Node_ENV !== "production") {
  //you cam leave this for the prod as well to tract the user requests
  app.use(morgan("dev"));
}

// router
import userRouter from "./src/router/userRouter.js";

app.use("/api/v1/users", userRouter);

app.use("/", (req, res) => {
  res.json({ message: "Server running healthy" });
});

app.use("*", (req, res, next) => {
  const error = {
    message: "404 page not found",
    errorCode: 404,
  };
  next(error);
});

//global error handler
app.use((error, req, res, next) => {
  console.log(error);

  const errorCode = error.errorCode || 500;
  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});
app.listen((error) => {
  error
    ? console.log(error)
    : console.log(`port is up and running at http://localhost:${port}`);
});
