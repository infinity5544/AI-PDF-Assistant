
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

try {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash"
    contents: "Reply with exactly: Hello World",
  });

  console.log(response.text);
} catch (err) {
  console.error("STATUS:", err.status);
  console.error("MESSAGE:", err.message);
  console.error(err);
}