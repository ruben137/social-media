import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
  {
    commentId: String,
    comment: String,
    from: String,
    likes: {
      type: Array,
      default: [],
    },
    profilePic: String,
  },
  { timestamps: true }
);

export default mongoose.model("comments", commentsSchema);
