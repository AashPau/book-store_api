import BurrowSchema from "./BurrowSchema.js";

//insert
export const insertBurrow = (obj) => {
  return BurrowSchema(obj).save();
};

//read all
export const getAllBurrows = (filter) => {
  return BurrowSchema.find(filter);
};

//get Burrow by id
export const getABurrowById = (_id) => {
  return BurrowSchema.findById(_id);
};

//update the Burrow
export const updateABurrowById = (_id, obj) => {
  return BurrowSchema.findByIdAndUpdate(_id, obj);
};
// //delete Burrow
// export const deleteABurrow = (_id) => {
//   return BurrowSchema.findByIdAndDelete(_id);
// };