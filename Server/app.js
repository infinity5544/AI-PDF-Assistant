import dotenv from "dotenv";

dotenv.config();

console.log("Loaded API Key:", process.env.GEMINI_API_KEY?.slice(0, 10));

import cors from "cors";
import express from "express";

import chatRoutes from "./routes/chatRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend running",
    });
});

app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Server error",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
