import express from "express";

import { answerQuestion } from "../services/aiService.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { documentId, question } = req.body;

        if (!documentId || !question?.trim()) {
            return res.status(400).json({
                success: false,
                message: "documentId and question are required",
            });
        }

        const result = await answerQuestion({
            documentId,
            question: question.trim(),
        });

        res.json({
            success: true,
            ...result,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
