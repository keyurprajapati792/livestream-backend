import express from "express";
import {
  updateLiveStream,
  getLiveStream,
} from "../controllers/liveStreamController.js";

const router = express.Router();

router.post("/", updateLiveStream);
router.get("/", getLiveStream);

export default router;
