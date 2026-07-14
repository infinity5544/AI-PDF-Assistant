import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar/>
      <ChatArea/>
      
    </div>
  );
}

export default App;