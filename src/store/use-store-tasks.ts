import { persist } from "zustand/middleware";
import { create } from "zustand";
import axios from "axios";
export interface Task {
  id: string;
  description: string;
  title: string;
  status: string;
  projectId: string;
}

interface TasksState {
  tasks: Task[];
  getTaskLoading: boolean;
  deleteTaskLoading: {
    id?: string;
  };
  createTasksLoad: boolean;
  getTasks: () => void;
  changeStatus: (taskId: string, status: string) => void;
  createTasks: (t: Task) => void;
  deleteTask: (taskId: string) => void;
}

export const useStoreTasks = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: [],
      getTaskLoading: false,
      createTasksLoad: false,
      deleteTaskLoading: {},

      getTasks: async () => {
        try {
          if (get().tasks.length === 0) {
            const { data } = await axios.get(
              "https://69364069f8dc350aff303c6d.mockapi.io/tasks"
            );
            set({ tasks: data, getTaskLoading: false });
          }
          set({ getTaskLoading: false });
        } catch (error) {
          set({ getTaskLoading: false });
          console.log(error);
        }
      },
      changeStatus: async (taskId: string, status: string) => {
        const updateTasks = get().tasks.map((task) =>
          task.id === taskId ? { ...task, status } : task
        );

        set({ tasks: updateTasks });
      },
      createTasks: (task) => {
        set({ createTasksLoad: true });
        const tempTasks = get().tasks;
        tempTasks.push(task);
        setTimeout(() => {
          set({ tasks: tempTasks, createTasksLoad: false });
        }, 300);
      },
      deleteTask: (taskId: string) => {
        set({ deleteTaskLoading: { id: taskId } });
        const temp = get().tasks;
        const newTasks = temp.filter((task) => taskId != task.id);
        setTimeout(() => {
          set({ tasks: newTasks, deleteTaskLoading: {} });
        }, 300);
      },
    }),
    { name: "tasks" }
  )
);
