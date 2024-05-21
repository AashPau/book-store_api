import bcrypt from "bcryptjs";

const saltRounds = 15;

export const hashPassword = (plainPass) => {
  return bcrypt.hashSync(plainPass, saltRounds);
};
export const comparePassword = (plainPass, hashPassword) => {
  return bcrypt.compareSync(plainPass, hashPassword);
};
