import React from "react";
function ChatInput() {
  return (
    <div className="bg-white border-t p-4">

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Ask anything about your PDF..."
          className="flex-1 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black "
        />

        <button className="bg-gray-800 text-white px-6 rounded-full hover:bg-gray-700 cursor-pointer">
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatInput;