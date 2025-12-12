import { FolderKanban, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ToggleTheme } from "./ToggleTheme";

export default function Navbar() {
  return (
    <div className=" p-3 bg-white dark:bg-black border-b">
      <div className="flex items-center justify-between w-full mx-auto md:w-[90%]">
        <div className="flex items-center gap-3 cursor-pointer">
          {" "}
          <div className="w-10 h-10 flex items-center justify-center p-1 rounded-md  gradient-primary text-white ">
            <FolderKanban className="size-5" />
          </div>
          <Link className="font-bold text-[20px]" to={"/"}>
            TaskFlow
          </Link>
        </div>
        <div>
          <ToggleTheme />
          <Button className="text-[14px] text-[#626d84] " variant={"ghost"}>
            {" "}
            <LayoutDashboard className="size-4" /> <span>Dashboard</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
