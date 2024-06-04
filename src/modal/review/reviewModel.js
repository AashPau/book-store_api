import reviewSchema from "./reviewSchema.js";

//insert
export const insertReview = (obj) => {
  return reviewSchema(obj).save();
};

//read all
export const getAllReviews = (filter) => {
  return reviewSchema.find(filter);
};

//get review by id
export const getAReviewById = (_id) => {
  return reviewSchema.findById(_id);
};

//update the review
export const updateAReviewById = (_id, obj) => {
  return reviewSchema.findByIdAndUpdate(_id, obj);
};
//delete review
export const deleteAReview = (_id) => {
  return reviewSchema.findByIdAndDelete(_id);
};
