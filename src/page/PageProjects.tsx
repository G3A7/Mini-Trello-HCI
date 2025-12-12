import CardProject from "@/components/CardProject";
import SearchInput from "@/components/SearchInput";
import SkeletonProjects from "@/components/SkeletonProjects";
import { Button } from "@/components/ui/button";
import { useStoreProjects } from "@/store/use-store-projects";
import { useStoreTasks } from "@/store/use-store-tasks";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PageProjects() {
  const navigate = useNavigate();
  const { projects, getProjects, getProjectsLoading } = useStoreProjects();
  const { tasks, getTasks } = useStoreTasks();
  useEffect(() => {
    getProjects();
    getTasks();
  }, [getTasks, getProjects]);

  return (
    <div className="pt-8">
      <div className="flex flex-wrap gap-1 items-center justify-between ">
        <div>
          <h2 className="font-bold text-[30px] text-[#131720] dark:text-white">
            Projects Dashboard
          </h2>
          <p className="text-[#626d84] dark:text-white ">
            Manage your projects and track progress across all tasks
          </p>
        </div>
        <Button
          onClick={() => {
            navigate("/create-project");
          }}
          className="gradient-primary cursor-pointer"
        >
          <Plus />
          New Project
        </Button>
      </div>

      <SearchInput />
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {getProjectsLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <SkeletonProjects key={i} />
            ))
          : projects?.map((project) => {
              return (
                <CardProject
                  numberTasks={tasks?.filter(
                    (task) => task.projectId == project.id
                  )}
                  key={project.id}
                  project={project}
                />
              );
            })}
      </div>
    </div>
  );
}
