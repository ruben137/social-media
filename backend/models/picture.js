import mongoose from "mongoose";

const profilePicSchema = new mongoose.Schema(
  {
    name: String,
    url: String,
  },
  { timestamps: true }
);

profilePicSchema.methods.setUrl = function setUrl(filename) {
  this.url = `http://localhost:5000/public/${filename}`;
};

export default mongoose.model("profilePics", profilePicSchema);
