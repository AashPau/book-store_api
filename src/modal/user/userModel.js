import userSchema from "./userSchema.js";

export const createNewUser = (userObj) => {
  return userSchema(userObj).save();
};
export const getUserByEmail = (email) => {
  return userSchema.findOne({ email });
};
export const updateUser = async (filter, obj) => {
  return await userSchema.findOneAndUpdate(filter, obj);
};
export const getAllUser = async () => {
  return await userSchema.find();
};
