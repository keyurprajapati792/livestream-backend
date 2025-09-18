// models/LiveStream.js
import mongoose from "mongoose";

const liveStreamSchema = new mongoose.Schema({
  url: { type: String, required: true },
  isLive: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("LiveStream", liveStreamSchema);
