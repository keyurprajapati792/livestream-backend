import Question from "../models/Question.js";

export const submitQuestion = async (req, res) => {
  try {
    const { question, clientEmail } = req.body;
    const newQ = await Question.create({ question, clientEmail });
    res.status(201).json(newQ);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $sort: { timestamp: -1 } },

      {
        $lookup: {
          from: "users", 
          localField: "clientEmail", 
          foreignField: "email", 
          as: "userInfo", 
        },
      },

      { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } },
    ]);

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
