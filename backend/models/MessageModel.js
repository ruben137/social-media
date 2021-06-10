import mongoose from "mongoose";
const msgSchema = new mongoose.Schema(
  {
    conversationId: String,
    sender: String,
    text: String,
    members: Array,
    backup: Array,
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("messages", msgSchema);
