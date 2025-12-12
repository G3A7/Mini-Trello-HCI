import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Kbd } from "./ui/kbd";
import { useStoreTasks } from "@/store/use-store-tasks";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function SearchInput() {
  const { tasks } = useStoreTasks();
  const [query, setQuery] = useState<string>("");
  const tasksFilters = tasks?.filter((task) =>
    (task?.title?.toLowerCase() as string).includes(query.toLowerCase())
  );
  return (
    <div className="my-5">
      <Dialog>
        <DialogTrigger className="w-full md:w-md relative" asChild>
          <div>
            <Kbd className="absolute top-2 right-1">⌘</Kbd>

            <Input placeholder="Search About Tasks" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mt-4 relative">
            <Kbd className="absolute top-2 right-1">⌘</Kbd>
            <Input
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search About Tasks"
            />
          </DialogHeader>
          <div className="h-[350px] overflow-auto">
            {tasksFilters.length == 0 ? (
              <h1> No Filters</h1>
            ) : (
              tasksFilters.map((task) => {
                return (
                  <div
                    key={task.id}
                    className="space-y-2 flex items-center px-1 gap-2 hover:bg-black/10   dark:hover:bg-black/50"
                  >
                    <Link to={`/project/${task.projectId}`}>{task.title}</Link>
                    <ArrowRight className="size-4" />
                  </div>
                );
              })
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
