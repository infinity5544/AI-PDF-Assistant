import { useRef, useState } from "react";
import {
  SendHorizonal,
  Paperclip,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatInput({
  sendMessage,
  onFileSelect,
  disabled = false,
}) {
  const [text, setText] = useState("");

  const fileInputRef = useRef(null);

  const submit = () => {
    const message = text.trim();

    if (!message || disabled) return;

    sendMessage(message);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onFileSelect?.(file);

    // Allow selecting the same file again
    e.target.value = "";
  };

  return (
    <div className="sticky bottom-0 w-full bg-background">
      <div className="mx-auto max-w-5xl">

        <div className="flex items-center gap-3 rounded-3xl border border-border bg-card px-4 py-3 shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500">

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          <Input
            value={text}
            disabled={disabled}
            placeholder={
              disabled
                ? "AI is thinking..."
                : "Ask anything about your PDF..."
            }
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
          />

          <Button
            type="button"
            onClick={submit}
            disabled={disabled || !text.trim()}
            className="rounded-full bg-blue-600 hover:bg-blue-700"
            size="icon"
          >
            <SendHorizonal className="h-5 w-5" />
          </Button>

        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          AI may make mistakes. Verify important information.
        </p>

      </div>
    </div>
  );
}