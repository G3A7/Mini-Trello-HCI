import { ArrowLeft, FolderOpen, Plus } from "lucide-react";
import { useStoreTasks } from "../store/use-store-tasks";
import ColumnTask from "../components/ColumnTask";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useStoreProjects } from "@/store/use-store-projects";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
export default function PageTasks() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, changeStatus } = useStoreTasks();
  const { projects } = useStoreProjects();
  const info = projects?.find((project) => project.id == id);
  const projectTasks = tasks?.filter((task) => task.projectId === id);

  const TasksInProgress = projectTasks?.filter(
    (task) => task.status == "in-progress"
  );
  const TasksTodo = projectTasks?.filter((task) => task.status == "todo");
  const TasksDone = projectTasks?.filter((task) => task.status == "done");

  const handledragend = (event: DragEndEvent) => {
    const { over, active } = event;
    console.log(event);
    if (!over) return;
    console.log(over.id);
    const taskId = active.id as string;
    const newColumnAndStatus = over.id as string;
    changeStatus(taskId, newColumnAndStatus);
  };

  return (
    <div className="pt-8">
      <div className="flex flex-wrap  items-center justify-between gap-1">
        <div>
          <Link
            to={"/"}
            className="flex items-center gap-2 text-[#626d84] mb-3"
          >
            {" "}
            <ArrowLeft className="size-4" /> Back to Dashboard
          </Link>
          <h2 className="font-bold text-[30px] flex items-center gap-3 mb-2">
            <div className="bg-[#e4ebf7] h-10 w-10 rounded-md flex items-center justify-center">
              <FolderOpen className="size-5 text-blue-600" />
            </div>{" "}
            <span> {info?.title}</span>
          </h2>
          <p className=" text-[#626d84]">{info?.description}</p>
        </div>
        <Button
          onClick={() => {
            navigate("/create-task");
          }}
          className="gradient-primary"
        >
          <Plus className="size-4" /> Add Task
        </Button>
      </div>

      <DndContext onDragEnd={handledragend}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-5">
          <ColumnTask
            changeStatus={changeStatus}
            tasks={TasksTodo}
            title="Todo"
            ids="todo"
          />
          <ColumnTask
            changeStatus={changeStatus}
            tasks={TasksInProgress}
            title="In Progress"
            ids="in-progress"
          />
          <ColumnTask
            changeStatus={changeStatus}
            tasks={TasksDone}
            title="Done"
            ids="done"
          />
        </div>
      </DndContext>
    </div>
  );
}
