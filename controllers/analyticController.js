import User from "../models/User.js";
import Question from "../models/Question.js";
import WatchSession from "../models/WatchSession.js";

export const getAnalytics = async (req, res) => {
  try {
    const totalRegistrations = await User.countDocuments();
    const totalQuestions = await Question.countDocuments();

    const sessions = await WatchSession.find({ duration: { $gt: 0 } });
    const totalAttendees = new Set(sessions.map((s) => s.userId.toString()))
      .size;
    const notShows = totalRegistrations - totalAttendees;

    // Average view calculation
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const avgSeconds = sessions.length
      ? Math.floor(totalDuration / sessions.length)
      : 0;

    const hours = String(Math.floor(avgSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((avgSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(avgSeconds % 60).padStart(2, "0");

    res.json({
      totalRegistrations,
      totalAttendees,
      notShows,
      totalQuestions,
      averageView: `${hours}:${minutes}:${seconds}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
