import WatchSession from "./models/WatchSession.js";

export const initSocket = (io) => {
  // In-memory set to track currently connected sockets
  const activeSockets = new Map(); // key: socket.id, value: sessionId

  io.on("connection", (socket) => {
    // Helper: emit live viewers count
    const emitLiveCount = () => {
      io.emit("liveViewerUpdate", activeSockets.size);
      console.log("Live viewers:", activeSockets.size);
    };

    // User joins the stream
    socket.on("joinStream", async ({ userId }) => {
      const session = new WatchSession({ userId, joinTime: new Date() });
      await session.save();

      // Track socket in memory
      activeSockets.set(socket.id, session._id);
      socket.data.sessionId = session._id;

      emitLiveCount();
    });

    // User leaves manually
    socket.on("leaveStream", async () => {
      const sessionId = activeSockets.get(socket.id);
      if (sessionId) {
        const session = await WatchSession.findById(sessionId);
        if (session && !session.leaveTime) {
          const leaveTime = new Date();
          session.leaveTime = leaveTime;
          session.duration = Math.floor((leaveTime - session.joinTime) / 1000);
          await session.save();
        }
      }

      activeSockets.delete(socket.id);
      emitLiveCount();
    });

    // Handle disconnect
    socket.on("disconnect", async () => {
      const sessionId = activeSockets.get(socket.id);
      if (sessionId) {
        const session = await WatchSession.findById(sessionId);
        if (session && !session.leaveTime) {
          const leaveTime = new Date();
          session.leaveTime = leaveTime;
          session.duration = Math.floor((leaveTime - session.joinTime) / 1000);
          await session.save();
        }
      }

      activeSockets.delete(socket.id);
      emitLiveCount();
    });
  });
};
