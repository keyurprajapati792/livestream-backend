import LiveStream from "../models/LiveStream.js";

export const updateLiveStream = async (req, res) => {
  try {
    const { url, isLive } = req.body;

    let liveStream = await LiveStream.findOne();
    if (!liveStream) {
      liveStream = new LiveStream({ url, isLive });
    } else {
      liveStream.url = url;
      liveStream.isLive = isLive;
      liveStream.updatedAt = Date.now();
    }

    await liveStream.save();

    // Emit socket event to all clients
    req.io.emit("liveStreamUpdated", { url, isLive });

    res.json(liveStream);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLiveStream = async (req, res) => {
  try {
    const liveStream = await LiveStream.findOne();
    res.json(liveStream || { url: null, isLive: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
