import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    members: Array,
    backup: Array,
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);
