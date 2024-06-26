import express from "express";
import { createNewUser, getUserByEmail } from "../modal/user/userModel.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { newUserValidation } from "../middlewares/joiValidation.js";
import { signAccessJWT, signRefreshJWT } from "../../utils/jwt.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

//========public controllers

//create new user //public

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
      error.status = 200;
    }
    next(error);
  }
});

//login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email.includes("@") || !password) {
      throw new Error("Invalid login details");
    }
    //find user by email
    const user = await getUserByEmail(email);

    if (user?._id) {
      //check if password match
      const isPassMatched = comparePassword(password, user.password);
      if (isPassMatched) {
        //user auth
        //create tokens, and return

        //sth needed here
        return res.json({
          status: "success",
          message: "user authenticated",
          tokens: {
            accessJWT: signAccessJWT({ email }),
            refreshJWT: signRefreshJWT({ email }),
          },
        });
      }
    }
    res.json({
      status: "error",
      message: "Invalid login Details",
    });

    //jwt
  } catch (error) {
    next(error);
  }
});

//===========private controllers

//return the useer profile
router.get("/", auth, (req, res, next) => {
  try {
    req.userInfo.refreshJWT = undefined;
    req.userInfo.__v = undefined;
    res.json({
      status: "success",
      message: "User Profile",
      user: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
});

//return new access JWT
router.get("/renew-accessjwt", auth, async (req, res, next) => {
  try {
    const { email } = req.userInfo;
    const accessJWT = await { email };
    res.json({ accessJWT });
  } catch (error) {
    next(error);
  }
});

export default router;
