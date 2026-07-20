import { useState } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  FileText,
  Sparkles,
  Settings,
  Trash2,
  Folder,
  UserCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const today = [
    "Operating Systems",
    "DBMS Notes",
    "Computer Networks",
  ];

  const yesterday = [
    "Machine Learning",
    "Random Graphs",
    "Algorithms",
  ];

  return (
    <aside
      className={`transition-all duration-300 bg-card border-r flex flex-col h-screen
      ${collapsed ? "w-20" : "w-72"}`}
    >
      {/* Logo */}

      <div className="px-5 pt-5 pb-4 flex items-center justify-between">

        {!collapsed && (

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">

              <Sparkles className="text-white w-5 h-5"/>

            </div>

            <div>

              <h1 className="font-bold text-xl">
                PDF AI
              </h1>

              <p className="text-xs text-muted-foreground">
                AI Assistant
              </p>

            </div>

          </div>

        )}

        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer rounded-full"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed
            ? <PanelLeftOpen/>
            : <PanelLeftClose/>}
        </Button>

      </div>

      <div className="px-4">

        <Button
          className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-lg"
        >

          <Plus className="mr-2 h-5 w-5"/>

          {!collapsed && "New Chat"}

        </Button>

      </div>

      {!collapsed && (

        <div className="px-4 mt-5">

          <div className="relative">

            <Search className="absolute left-3 top-3 text-muted-foreground w-4 h-4"/>

            <Input
              placeholder="Search conversations..."
              className="pl-10 rounded-xl"
            />

          </div>

        </div>

      )}

      <Separator className="my-5"/>

      <ScrollArea className="flex-1">

        {!collapsed && (

          <>

            <div className="px-5 mb-2">

              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Today
              </h2>

            </div>

            {today.map((chat,index)=>(
              <button
                key={index}
                className="mx-3 mb-2 w-[calc(100%-24px)] rounded-xl p-3 flex items-center hover:bg-accent transition cursor-pointer"
              >

                <FileText className="text-red-500 mr-3 w-4 h-4"/>

                <span className="truncate">
                  {chat}
                </span>

              </button>
            ))}

            <div className="px-5 mt-6 mb-2">

              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Yesterday
              </h2>

            </div>

            {yesterday.map((chat,index)=>(
              <button
                key={index}
                className="mx-3 mb-2 w-[calc(100%-24px)] rounded-xl p-3 flex items-center hover:bg-accent transition cursor-pointer"
              >

                <Folder className="text-blue-500 mr-3 w-4 h-4"/>

                <span className="truncate">
                  {chat}
                </span>

              </button>
            ))}

          </>

        )}

      </ScrollArea>

      <Separator/>

      {!collapsed && (

        <div className="p-4">

          <div className="rounded-2xl bg-muted p-4">

            <div className="flex justify-between text-sm mb-2">

              <span>Storage</span>

              <span>45%</span>

            </div>

            <div className="h-2 rounded-full bg-slate-300 overflow-hidden">

              <div className="bg-blue-600 h-full w-[45%]"/>

            </div>

          </div>

        </div>

      )}

      <div className="p-4 space-y-2">

        <Button
          variant="ghost"
          className={`cursor-pointer ${collapsed?"":"justify-start w-full"}`}
        >

          <Settings className="w-4 h-4"/>

          {!collapsed && <span className="ml-2">Settings</span>}

        </Button>

        <Button
          variant="ghost"
          className={`cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-500/10 ${collapsed?"":"justify-start w-full"}`}
        >

          <Trash2 className="w-4 h-4"/>

          {!collapsed && <span className="ml-2">Clear Chats</span>}

        </Button>

        {!collapsed && (

          <div className="mt-6 flex items-center gap-3 border rounded-2xl p-3">

            <UserCircle2 className="w-10 h-10"/>

            <div>

              <p className="font-semibold">
                Rahul
              </p>

              <p className="text-xs text-muted-foreground">
                Free Plan
              </p>

            </div>

          </div>

        )}

      </div>

    </aside>
  );
}