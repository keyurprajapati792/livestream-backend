import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors"; // <-- add this
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import analyticRoutes from "./routes/analyticRoutes.js";
import liveStreamRoutes from "./routes/livestreamRoutes.js";

import { initSocket } from "./socket.js";

dotenv.config();
connectDB();

const app = express();

// Enable CORS for API
app.use(
  cors({
    origin: "*", // React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  req.io = io; // attach io so controllers can emit
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/analytics", analyticRoutes);
app.use("/api/livestream", liveStreamRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Socket setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

initSocket(io);

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
