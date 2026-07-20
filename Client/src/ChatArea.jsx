import { useState } from "react";

import Header from "./Header";
import UploadCard from "./UploadCard";
import ChatInput from "./ChatInput";
import ChatBubble from "./ChatBubble";

import api from "./api/axios";

export default function ChatArea() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [documentId, setDocumentId] = useState("");
  const [documentName, setDocumentName] = useState("");

  const [uploading, setUploading] = useState(false);
  const [answering, setAnswering] = useState(false);

  const [messages, setMessages] = useState([
    {
      user: false,
      message:
        "👋 Welcome! Upload a PDF and start chatting with your document.",
    },
  ]);

  // Upload any PDF
  const uploadFile = async (file, fromChat = false) => {
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      if (fromChat) {
        setMessages((prev) => [
          ...prev,
          {
            user: true,
            message: `📎 Uploaded: ${file.name}`,
          },
        ]);
      }

      const { data } = await api.post("/api/upload", formData);

      const uploadedDocument = data.document;

      setSelectedFile(file);
      setDocumentId(uploadedDocument.documentId);
      setDocumentName(uploadedDocument.originalName);

      if (fromChat) {
        setMessages((prev) => [
          ...prev,
          {
            user: false,
            message: `✅ ${uploadedDocument.originalName} uploaded successfully.

Indexed ${uploadedDocument.characters.toLocaleString()} characters across ${uploadedDocument.chunks} chunks.

Now ask me anything about this PDF.`,
          },
        ]);
      } else {
        setMessages([
          {
            user: false,
            message: `✅ ${uploadedDocument.originalName} uploaded successfully.

Indexed ${uploadedDocument.characters.toLocaleString()} characters across ${uploadedDocument.chunks} chunks.

Ask me anything about this PDF.`,
          },
        ]);
      }
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          user: false,
          message:
            err.response?.data?.message ||
            "❌ Failed to upload PDF.",
        },
      ]);
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please choose a PDF.");
      return;
    }

    await uploadFile(selectedFile, false);
  };

  const sendMessage = async (question) => {
    if (!question.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        user: true,
        message: question,
      },
    ]);

    setAnswering(true);

    try {
      const { data } = await api.post("/api/chat", {
        documentId,
        question,
      });

      setMessages((prev) => [
        ...prev,
        {
          user: false,
          message: data.answer,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          user: false,
          message:
            err.response?.data?.message ||
            "Something went wrong.",
        },
      ]);
    } finally {
      setAnswering(false);
    }
  };

  return (
    <div className="flex flex-1 min-h-0 flex-col bg-slate-50 dark:bg-background transition-colors duration-300">
      <Header documentName={documentName} />

      {!documentId ? (
        <UploadCard
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          handleUpload={handleUpload}
          uploading={uploading}
        />
      ) : (
        <>
          <div className="flex-1 min-h-0 overflow-y-auto px-8 py-8">
            <div className="mx-auto max-w-5xl space-y-6">
              {messages.map((msg, index) => (
                <ChatBubble
                  key={index}
                  user={msg.user}
                  message={msg.message}
                />
              ))}

              {answering && (
                <ChatBubble
                  user={false}
                  message="🤖 Thinking..."
                />
              )}
            </div>
          </div>

          <div className="shrink-0 border-t border-border bg-background px-8 py-5">
            <div className="mx-auto max-w-5xl">
              <ChatInput
                sendMessage={sendMessage}
                disabled={answering || uploading}
                onFileSelect={(file) => uploadFile(file, true)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}