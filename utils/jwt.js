import JWT from "jsonwebtoken";
import { insertToken } from "../src/modal/session/SessionSchema.js";
import { updateUser } from "../src/modal/user/userModel.js";

//create acess jwt
export const signAccessJWT = (payload) => {
  const token = JWT.sign(payload, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "15min",
  });
  insertToken({ token });
  return token;
};

//verify access jst

//create refresh jwt
export const singleRefreshJWT = (email) => {
  const refreshJWT = JWT.sign({ email }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "30d",
  });
  updateUser({ email }, { refreshJWT });
  return refreshJWT;
};
//verify refresh jwt
