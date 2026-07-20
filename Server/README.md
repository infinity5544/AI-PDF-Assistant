# Server

Backend API for the AI PDF Assistant.

Built using Express and Google Gemini.

---

## Tech Stack

- Node.js
- Express
- Multer
- pdf-parse
- Google Gemini API

---

## Install

```bash
npm install
```

---

## Environment Variables

Create:

```
.env
```

Example:

```
PORT=5000
GEMINI_API_KEY=YOUR_API_KEY
```

---

## Run

```bash
npm run dev
```

Server starts at

```
http://localhost:5000
```

---

## API Endpoints

### Upload PDF

```
POST /api/upload
```

Form Data

```
pdf : File
```

Returns

```json
{
  "document": {
    "documentId": "...",
    "originalName": "...",
    "characters": 12345,
    "chunks": 20
  }
}
```

---

### Chat

```
POST /api/chat
```

Body

```json
{
  "documentId": "...",
  "question": "Summarize chapter 2"
}
```

Returns

```json
{
  "answer": "...",
  "chunksUsed": 5
}
```

---

## Folder Structure

```
controllers/
middleware/
routes/
services/
uploads/
app.js
```

---

## Future Improvements

- Persistent database
- Vector search
- User authentication
- Chat history
- Streaming responses
- Multi-PDF retrieval
