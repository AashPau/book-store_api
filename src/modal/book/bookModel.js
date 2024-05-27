import bookSchema from "./bookSchema.js";

//insert
export const insertBook = (obj) => {
  return bookSchema(obj).save();
};

//read all
export const getAllBooks = (filter) => {
  return bookSchema.find(filter);
};

//get book by id
export const getABookById = (_id) => {
  return bookSchema.findById(_id);
};

//update the book
export const updateABookById = (_id, obj) => {
  return bookSchema.findByIdAndUpdate(_id, obj);
};
//delete book
export const deleteAbook = (_id) => {
  return bookSchema.findByIdAndDelete(_id);
};
