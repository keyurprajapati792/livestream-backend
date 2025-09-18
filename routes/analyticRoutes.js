import express from "express";
import { getAnalytics } from "../controllers/analyticController.js";

const router = express.Router();

router.get("/", getAnalytics);

export default router;
