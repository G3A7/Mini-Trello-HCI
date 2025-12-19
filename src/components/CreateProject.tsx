import { ArrowLeft, FolderPlus, Loader2, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useStoreProjects } from "@/store/use-store-projects";

export default function CreateProject() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { createLoading, createProject: createProjectStore } =
    useStoreProjects();
  const createProject = async () => {
    if (!title || !description) {
      return toast.error("All filed Required");
    }
    if (title.length < 3) {
      return toast.error("Title must be greater than 3 letters");
    }
    if (description.length > 100) {
      return toast.warning("To Write more 100 letters must pay some money");
    }
    createProjectStore({ title, description });
    setTitle("");
    setDescription("");
    navigate("/");
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
            <FolderPlus />
          </div>{" "}
          <h3 className="font-bold text-[30px]">Create New Project</h3>
        </div>
        <p className="text-[#626d84] text-[16px]">
          Set up a new project to organize your tasks
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
              id="title"
              placeholder="Enter Project Title..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Description">
              Description <span className="text-red-600">*</span>
            </Label>
            <Textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id="Description"
              placeholder="Describe your Project..."
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              createProject();
            }}
            disabled={createLoading}
            className="gradient-primary w-[150px]"
          >
            {" "}
            {createLoading ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <>
                <Plus /> Create Project
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
