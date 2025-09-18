import express from "express";
import {
  submitQuestion,
  getAllQuestions,
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/", submitQuestion);
router.get("/", getAllQuestions);

export default router;
