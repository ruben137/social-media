import mongoose from "mongoose";

const likesSchema = new mongoose.Schema(
  {
    likeId: String,

    from: String,
  },
  { timestamps: true }
);

export default mongoose.model("likes", likesSchema);
