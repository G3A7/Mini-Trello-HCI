import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  FolderOpen,
  ListTodo,
  Loader2,
  Trash2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "./ui/button";
import { Link } from "react-router-dom";
import { Project, useStoreProjects } from "@/store/use-store-projects";
import { Task } from "@/store/use-store-tasks";

export default function CardProject({
  project,
  numberTasks,
}: {
  project: Project;
  numberTasks: Task[];
}) {
  const { deleteProjectLoading, deleteProject } = useStoreProjects();
  return (
    <Card className="-space-y-3 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="w-11 h-11 flex items-center justify-center p-1 rounded-md bg-[#e9effb]">
            <FolderOpen className="size-5 text-blue-500" />
          </div>

          <Button
            onClick={() => {
              deleteProject(project.id + "");
            }}
            className="cursor-pointer"
            variant={"ghost"}
            size={"icon"}
          >
            {deleteProjectLoading.id == project.id ? (
              <Loader2 className="animate-spin size-5" />
            ) : (
              <Trash2 className="size-5 text-red-600" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 ">
        <h3 className="font-semibold text-[18px] ">{project.title}</h3>
        <p className="text-[#626d84] text-[14px] ">{project.description}</p>
        <Badge variant={"outline"}>
          {" "}
          <ListTodo className="size-3 " /> {numberTasks?.length} tasks
        </Badge>
      </CardContent>
      <CardFooter>
        <Link
          to={`/project/${project.id}`}
          className={buttonVariants({
            variant: "outline",
            className:
              "flex items-center justify-center gap-3 cursor-pointer w-full",
          })}
        >
          View Tasks
          <ArrowRight className="size-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
