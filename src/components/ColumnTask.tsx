import { Circle, Clock, CheckCircle2 } from "lucide-react";
import CardTask from "./CardTask";
import { Task } from "../store/use-store-tasks";
import { useDroppable } from "@dnd-kit/core";
function setIcon(title: string) {
  switch (title) {
    case "In Progress":
      return <Clock className="size-5 text-blue-500" />;

    case "Done":
      return <CheckCircle2 className="size-5 text-green-600" />;
    case "Todo":
      return <Circle className="size-5 text-orange-300" />;
  }
}

export default function ColumnTask({
  tasks,
  title,
  changeStatus,
  ids,
}: {
  tasks: Task[];
  title: string;
  ids: string;
  changeStatus: (taskId: string, status: string) => void;
}) {
  const { setNodeRef } = useDroppable({
    id: ids,
  });
  return (
    <div
      className="shadow rounded-md min-h-[150px] dark:border"
      ref={setNodeRef}
    >
      <div className="flex rounded-md  items-center gap-4   p-1">
        <div
          className={`${
            title == "In Progress"
              ? "bg-[#cfdbf2]"
              : title == "Done"
              ? "bg-[#ceeddb]"
              : "bg-[#f4e7cd]"
          } w-10 h-10  flex items-center justify-center rounded-md`}
        >
          {setIcon(title)}
        </div>
        <div>
          <p className="font-semibold text-[16px]">{title}</p>
          <span className="text-[#626d84] text-[12px]">
            {" "}
            {tasks?.length} tasks
          </span>
        </div>
      </div>

      <div className="p-2">
        {tasks.length == 0 ? (
          <div className="min-h-[150px] flex items-center justify-center ">
            No Tasks
          </div>
        ) : (
          tasks.map((task) => {
            return (
              <CardTask
                key={task.id}
                task={task}
                setIcon={setIcon}
                title={title}
                changeStatus={changeStatus}
              />
            );
          })
        )}{" "}
      </div>
    </div>
  );
}
