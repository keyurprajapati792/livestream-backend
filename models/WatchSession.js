import mongoose from "mongoose";

const watchSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinTime: { type: Date, required: true },
    leaveTime: { type: Date },
    duration: { type: Number, default: 0 }, // seconds
  },
  { timestamps: true }
);

export default mongoose.model("WatchSession", watchSessionSchema);
