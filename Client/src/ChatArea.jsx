import ChatInput from "./ChatInput";

function ChatArea() {
  return (
    <div className="flex flex-col flex-1">

      <div className="border-b bg-white px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold">
          AI PDF Assistant
        </h1>
      </div>

      <div className=" flex-1 overflow-y-auto p-8">

        <div className="flex flex-col items-center h-40 border border-dashedn borfer-2 rounded-md">
          <input
              type="file"
              placeholder="Choose a PDF file"
              accept=".pdf"
              
              className="w-full h-40 bg-gray-100  cursor-crosshair"
            />
           <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 w-full cursor-pointer">
              Upload
          </button>

        </div>
       
      </div>

      <ChatInput />

    </div>
  );
}

export default ChatArea;