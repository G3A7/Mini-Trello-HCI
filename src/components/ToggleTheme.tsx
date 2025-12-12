import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStoreTheme } from "@/store/use-store-theme";
import { useEffect } from "react";

export function ToggleTheme() {
  const { theme, setTheme } = useStoreTheme();
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, [theme]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon">
          {" "}
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />{" "}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />{" "}
          <span className="sr-only">Toggle theme</span>{" "}
        </Button>{" "}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {" "}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>{" "}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>{" "}
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>{" "}
      </DropdownMenuContent>{" "}
    </DropdownMenu>
  );
}
