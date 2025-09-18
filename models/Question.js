import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  clientEmail: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Question", questionSchema);
