import {
  ArrowLeft,
  ArrowRight,
  GripHorizontal,
  GripVertical,
  Loader2,
  Move,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { Task, useStoreTasks } from "../store/use-store-tasks";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function CardTask({
  title,
  setIcon,
  task,
  changeStatus,
}: {
  setIcon: (i: string) => React.ReactNode;
  title: string;
  task: Task;
  changeStatus: (taskId: string, status: string) => void;
}) {
  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: task.id,
  });

  const { deleteTask, deleteTaskLoading } = useStoreTasks();
  const style = transform
    ? {
        transform: `
      translate(${transform.x}px,${transform.y}px)`,
      }
    : undefined;
  return (
    <div style={style} ref={setNodeRef}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <Card className="p-2 shadow my-5 rounded-md ">
          <CardHeader className="relative">
            <div
              className="absolute top-2 right-2 cursor-move "
              {...listeners}
              {...attributes}
            >
              <GripVertical className="size-5" />
            </div>
            <CardTitle>
              <div className="flex items-center gap-2">
                <div
                  className={`${
                    title == "In Progress"
                      ? "bg-[#cfdbf2]"
                      : title == "Done"
                      ? "bg-[#ceeddb]"
                      : "bg-[#f4e7cd]"
                  } w-5 h-5  flex items-center justify-center rounded-md p-1`}
                >
                  {setIcon(title)}
                </div>{" "}
                <span
                  className={`${
                    title == "In Progress"
                      ? "text-blue-500"
                      : title == "Done"
                      ? "text-green-600"
                      : "text-orange-300"
                  }`}
                >
                  {title}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium text-[16px]">{task.title}</p>
              <p className="text-[#626d84] text-[14px]">{task.description}</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex  justify-between items-center">
              {title == "In Progress" ? (
                <div className="flex items-center">
                  <Button
                    onClick={() => {
                      changeStatus(task.id, "todo");
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    variant={"ghost"}
                  >
                    {" "}
                    <ArrowLeft />
                  </Button>
                  <Button
                    onClick={() => {
                      changeStatus(task.id, "done");
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    variant={"ghost"}
                  >
                    <ArrowRight />
                  </Button>
                </div>
              ) : title == "Todo" ? (
                <div className="flex items-center">
                  <Button
                    onClick={() => {
                      changeStatus(task.id, "in-progress");
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    variant={"ghost"}
                  >
                    <ArrowRight />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center">
                  <Button
                    onClick={() => {
                      changeStatus(task.id, "in-progress");
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    variant={"ghost"}
                  >
                    <ArrowLeft />
                  </Button>
                </div>
              )}

              <Button
                onClick={() => {
                  deleteTask(task.id + "");
                }}
                onPointerDown={(e) => e.stopPropagation()}
                variant={"ghost"}
                className="text-red-500  cursor-pointer hover:text-red-500"
              >
                {""}
                {deleteTaskLoading.id == task.id ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2 />
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
