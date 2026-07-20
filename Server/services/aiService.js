import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { getRelevantContext } from "./documentService.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function answerQuestion({ documentId, question }) {
  const context = getRelevantContext(documentId, question);

  if (!context) {
    throw new Error("Document not found.");
  }

  const prompt = `
You are an AI PDF Assistant.

Answer ONLY using the document below.

=========================
DOCUMENT
=========================

${context.chunks.map((chunk) => chunk.text).join("\n\n")}

=========================
QUESTION
=========================

${question}

Rules:
1. Answer only using the document.
2. If the answer is not present, say:
"I couldn't find that information in the uploaded PDF."
3. Do not make up information.
`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  return {
    answer: response.text,
    chunksUsed: context.chunks.length,
  };
}