# 🤖 AI PDF Assistant

An AI-powered PDF Question Answering application built with **React**, **Node.js**, **Express**, and **Google Gemini**.

Users can upload PDF documents and ask natural language questions. The application extracts the document text, retrieves the most relevant context, and generates intelligent answers using Google's Gemini AI.

---

## ✨ Features

- 📄 Upload PDF documents
- 💬 Chat with uploaded PDFs
- 🧠 AI-powered answers using Google Gemini
- ⚡ Fast document chunking and retrieval
- 🎨 Modern React UI
- 🌙 Clean responsive interface
- 📁 Upload new PDFs during chat
- 🔒 Secure environment variable handling

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- shadcn/ui
- Axios
- Lucide Icons

### Backend
- Node.js
- Express
- Multer
- pdf-parse
- Google Gemini API

---

## 📂 Project Structure

```
Ai_pdf_web
│
├── Client
│   ├── src
│   ├── public
│   └── ...
│
├── Server
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   └── ...
│
└── README.md
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Ai_pdf_web.git
cd Ai_pdf_web
```

### Install Frontend

```bash
cd Client
npm install
```

### Install Backend

```bash
cd ../Server
npm install
```

---

## Configure Environment

Create:

```
Server/.env
```

Add:

```
GEMINI_API_KEY=YOUR_API_KEY
PORT=5000
```

---

## Run Backend

```bash
cd Server
npm run dev
```

Backend:

```
http://localhost:5000
```

---

## Run Frontend

```bash
cd Client
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

## Screenshots

Add screenshots here after deployment.

---

## Future Improvements

- Conversation memory
- Vector database
- Authentication
- Streaming AI responses
- Source citations
- Chat history
- Multi-document support
- Cloud deployment

---

## License

MIT
