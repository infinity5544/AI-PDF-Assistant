import { readFile } from "node:fs/promises";
import { PDFParse } from "pdf-parse";

const documents = new Map();

const MAX_CONTEXT_CHUNKS = 4;
const CHUNK_SIZE = 1200;
const CHUNK_OVERLAP = 180;

function normalizeWhitespace(text) {
    return text.replace(/\s+/g, " ").trim();
}

function tokenize(text) {
    return normalizeWhitespace(text)
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 2);
}

function chunkText(text) {
    const cleanText = normalizeWhitespace(text);

    const chunks = [];

    for (
        let start = 0;
        start < cleanText.length;
        start += CHUNK_SIZE - CHUNK_OVERLAP
    ) {
        const chunk = cleanText
            .slice(start, start + CHUNK_SIZE)
            .trim();

        if (chunk) {
            chunks.push({
                id: chunks.length + 1,
                text: chunk,
                tokens: tokenize(chunk),
            });
        }
    }

    return chunks;
}

function scoreChunk(chunk, questionTokens) {
    if (!questionTokens.length) return 0;

    const tokenSet = new Set(chunk.tokens);

    return questionTokens.reduce((score, token) => {
        return score + (tokenSet.has(token) ? 1 : 0);
    }, 0);
}

export async function createDocumentFromPDF(file) {
    const data = await readFile(file.path);

    const parser = new PDFParse({ data });

    try {
        const result = await parser.getText();

        const text = normalizeWhitespace(result.text || "");

        console.log("\n========== PDF DEBUG ==========");
        console.log("Characters:", text.length);
        console.log("First 1000 characters:\n");
        console.log(text.substring(0, 1000));
        console.log("========== END DEBUG ==========\n");

        if (!text) {
            throw new Error("No readable text was found in this PDF.");
        }

        const documentId = file.filename;

        const chunks = chunkText(text);

        console.log(`Created ${chunks.length} chunks`);

        documents.set(documentId, {
            id: documentId,
            originalName: file.originalname,
            filename: file.filename,
            path: file.path,
            text,
            chunks,
            createdAt: new Date().toISOString(),
        });

        return {
            documentId,
            filename: file.filename,
            originalName: file.originalname,
            characters: text.length,
            chunks: chunks.length,
        };
    } finally {
        await parser.destroy();
    }
}

export function getDocument(documentId) {
    return documents.get(documentId);
}

export function getRelevantContext(documentId, question) {
    const document = getDocument(documentId);

    if (!document) {
        return null;
    }

    const questionTokens = tokenize(question);

    const rankedChunks = document.chunks
        .map((chunk) => ({
            ...chunk,
            score: scoreChunk(chunk, questionTokens),
        }))
        .sort((a, b) => b.score - a.score || a.id - b.id);

    const usefulChunks = rankedChunks.some(
        (chunk) => chunk.score > 0
    )
        ? rankedChunks.filter((chunk) => chunk.score > 0)
        : rankedChunks;

    console.log("\n===== RETRIEVED CONTEXT =====");
    usefulChunks
        .slice(0, MAX_CONTEXT_CHUNKS)
        .forEach((chunk, index) => {
            console.log(
                `Chunk ${index + 1}:\n${chunk.text.substring(0, 250)}\n`
            );
        });
    console.log("=============================\n");

    return {
        document,
        chunks: usefulChunks.slice(0, MAX_CONTEXT_CHUNKS),
    };
}
