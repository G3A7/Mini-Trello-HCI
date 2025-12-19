import { ArrowLeft, ListTodo, Loader2, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useStoreProjects } from "@/store/use-store-projects";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useStoreTasks } from "@/store/use-store-tasks";
type Status = "done" | "in-progress" | "todo";
export default function CreateTask() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<Status | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const { createTasksLoad, createTasks } = useStoreTasks();
  const { projects } = useStoreProjects();
  const handleCreateTask = async () => {
    if (!title || !description || !projectId || !status) {
      return toast.error("All filed Required");
    }
    if (title.length < 3) {
      return toast.error("Title must be greater than 3 letters");
    }
    if (description.length > 100) {
      return toast.warning("To Write more 100 letters must pay some money");
    }
    if (!projectId) {
      return toast.error("must be select Projects");
    }
    if (!status) {
      return toast.error("must be select Status");
    }

    createTasks({
      title,
      description,
      status,
      projectId,
      id: String(new Date()),
    });
    setTitle("");
    setDescription("");
    setProjectId(null);
    setStatus(null);

    navigate(`/project/${projectId}`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <div className="space-y-3">
        <Link to={"/"} className="text-[#626d84] flex items-center gap-1">
          {" "}
          <ArrowLeft className="size-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 gradient-primary rounded-md flex items-center justify-center text-white">
            <ListTodo className="size-5 " />
          </div>{" "}
          <h3 className="font-bold text-[30px]">Add New Task</h3>
        </div>
        <p className="text-[#626d84] text-[16px]">
          Create a new task and assign it to a project
        </p>
      </div>
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Project Title <span className="text-red-600">*</span>
            </Label>
            <Input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              id="title"
              placeholder="Enter Project Title..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Description">
              Description <span className="text-red-600">*</span>
            </Label>
            <Textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id="Description"
              placeholder="Describe your Project..."
            />
          </div>
          <div>
            <Select
              onValueChange={(value) => {
                setProjectId(String(value));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                {projects?.map((project) => {
                  return (
                    <SelectItem key={project.id} value={project.id}>
                      {project.title}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              onValueChange={(value) => {
                setStatus(value as Status);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {["todo", "done", "in-progress"]?.map((status) => {
                  return (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              handleCreateTask();
            }}
            disabled={createTasksLoad}
            className="gradient-primary w-[150px]"
          >
            {" "}
            {createTasksLoad ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <>
                <Plus /> Create Task
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
