import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    associate: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
//const
const SessionSchema = mongoose.model("Session", sessionSchema);

//jus to show that we can write both schema and model in the same fiele
//Queries

export const insertToken = (obj) => {
  return SessionSchema(obj).save();
};

export const findToken = (obj) => {
  return SessionSchema.findOne({ obj });
};
