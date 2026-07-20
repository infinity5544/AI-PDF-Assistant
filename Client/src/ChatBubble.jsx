import { useState } from "react";
import {
  Bot,
  User,
  Copy,
  RotateCcw,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ChatBubble({ user, message }) {
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div
      className={`flex gap-4 mb-8 ${
        user ? "justify-end" : "justify-start"
      }`}
    >
      {!user && (
        <Avatar className="w-11 h-11 shadow">
          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
            <Bot size={18} />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={`group max-w-3xl rounded-3xl border shadow-sm overflow-hidden transition-all duration-300

        ${
          user
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-card border-border"
        }`}
      >
        <div className="px-6 py-5">

          {!user && (
            <p className="font-semibold text-blue-600 mb-4 flex items-center gap-2">

              <Bot size={16} />

              PDF AI Assistant

            </p>
          )}

          {user && (
            <p className="font-semibold text-blue-100 mb-4 flex items-center gap-2">

              <User size={16} />

              You

            </p>
          )}

          <p className="leading-8 whitespace-pre-wrap text-[15px]">

            {message}

          </p>

        </div>

        <div
          className={`px-5 py-3 border-t flex items-center justify-between

          ${
            user
              ? "border-blue-500/40"
              : "border-border"
          }`}
        >
          <span
            className={`text-xs

            ${
              user
                ? "text-blue-100"
                : "text-muted-foreground"
            }`}
          >
            Just now
          </span>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">

            <Button
              size="icon"
              variant="ghost"
              onClick={copyText}
              className="cursor-pointer"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500"/>
              ) : (
                <Copy className="w-4 h-4"/>
              )}
            </Button>

            {!user && (
              <Button
                size="icon"
                variant="ghost"
                className="cursor-pointer"
              >
                <RotateCcw className="w-4 h-4"/>
              </Button>
            )}

          </div>

        </div>

      </div>

      {user && (
        <Avatar className="w-11 h-11 shadow">
          <AvatarFallback className="bg-slate-900 text-white dark:bg-slate-200 dark:text-black">
            <User size={18} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
