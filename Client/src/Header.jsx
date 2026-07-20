import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  Sparkles,
  Bell,
  UserCircle2
} from "lucide-react";

import { useTheme } from "next-themes";

export default function Header({ documentName = "" }) {

  const { theme, setTheme } = useTheme();

  return (

    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b">

      <div className="h-16 px-8 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold tracking-tight">

            AI PDF Assistant

          </h1>

          <p className="text-sm text-muted-foreground">

            {documentName || "Upload, search and chat with your documents"}

          </p>

        </div>

        <div className="flex items-center gap-3">

          <Badge
            variant="secondary"
            className="rounded-full px-4 py-1"
          >

            <Sparkles className="w-4 h-4 mr-2"/>

            AI Ready

          </Badge>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full cursor-pointer"
          >

            <Bell className="w-5 h-5"/>

          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full cursor-pointer"
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
          >

            {theme === "dark"
              ? <Sun className="w-5 h-5"/>
              : <Moon className="w-5 h-5"/>}

          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full cursor-pointer"
          >

            <UserCircle2 className="w-6 h-6"/>

          </Button>

        </div>

      </div>

    </header>

  );

}
