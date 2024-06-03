import mongoose from "mongoose";

const burrowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: "true",
    },
    UserName: {
      type: String,
      required: true,
    },
    bookId: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
      required: "true",
    },
    bookTitle: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Burrow", burrowSchema);
