import { verifyAccessJWT } from "../../utils/jwt.js";
import { findToken } from "../modal/session/SessionSchema.js";
import { getUserByEmail } from "../modal/user/userModel.js";

export const auth = async (req, res, next) => {
  try {
    //1.receive jwt via auth header
    const { authorization } = req.headers;
    console.log("auth" + authorization);
    //2. verify if jwt is valid(no expired, secret key) by decoding jsw
    const decoded = verifyAccessJWT(authorization);
    console.log("check 2" + decoded.email);
    console.log("decoded" + decoded);
    if (decoded?.email) {
      //3. check if the token exist in the DB, session table
      const tokenObj = await findToken(authorization);

      console.log("token obj =" + tokenObj);

      if (tokenObj?._id) {
        //4. extract the email from the decoded jwt obj
        //5. get user by email
        const user = await getUserByEmail(decoded.email);

        if (user?._id) {
          //6. if the user exists, they are now authorized

          user.password = undefined;
          req.userInfo = user;
          console.log("user" + user);
          return next();
        }
      }
    }
  } catch (error) {
    next(error);
  }
};
