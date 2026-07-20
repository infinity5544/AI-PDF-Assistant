import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";

export default function App() {
  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 text-foreground">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatArea />
      </main>

    </div>
  );
}