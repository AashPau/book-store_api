import userSchema from "./userSchema.js";

export const createNewUser = (userObj) => {
  return userSchema(userObj).save();
};
