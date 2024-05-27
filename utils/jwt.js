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
export const verifyAccessJWT = (token) => {
  try {
    console.log("jwt" + token);
    return JWT.verify(token, process.env.ACCESS_JWT_SECRET);
  } catch (error) {
    console.log(error.message);
    return error.message === "jwt expired" ? "Jwt Expired" : "Invalid Token";
  }
};
//create refresh jwt
export const signRefreshJWT = ({ email }) => {
  const refreshJWT = JWT.sign({ email }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "30d",
  });
  updateUser({ email }, { refreshJWT });
  return refreshJWT;
};
//verify refresh jwt
