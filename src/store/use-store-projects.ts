import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";
import { useStoreTasks } from "./use-store-tasks";

export type Project = {
  id: string;
  title: string;
  description: string;
};
interface ProjectState {
  projects: Project[];
  getProjectsLoading: boolean;
  deleteProjectLoading: {
    id?: string;
  };
  createLoading: boolean;
  getProjects: () => void;
  createProject: (project: { title: string; description: string }) => void;
  deleteProject: (projectId: string) => void;
}
export const useStoreProjects = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      createLoading: false,
      getProjectsLoading: false,
      deleteProjectLoading: {},
      getProjects: async () => {
        try {
          set({ getProjectsLoading: true });
          if (get().projects.length == 0) {
            const { data } = await axios.get(
              "https://69364069f8dc350aff303c6d.mockapi.io/projects"
            );
            set({ getProjectsLoading: false, projects: data });
          }
          set({ getProjectsLoading: false });
        } catch (error) {
          set({ getProjectsLoading: false });
          console.log(error);
        }
      },
      createProject: async (project: {
        title: string;
        description: string;
      }) => {
        set({ createLoading: true });
        const tempProjects = get().projects;
        tempProjects.push({ ...project, id: String(Date.now()) });
        setTimeout(() => {
          set({ projects: tempProjects, createLoading: false });
        }, 300);
      },
      deleteProject: (projectId: string) => {
        set({ deleteProjectLoading: { id: projectId } });
        const tempTasks = useStoreTasks.getState().tasks;
        const newTasks = tempTasks.filter(
          (task) => projectId != task.projectId
        );
        useStoreTasks.setState({ tasks: newTasks });

        const temp = get().projects;
        const newProjects = temp.filter((project) => project.id != projectId);
        setTimeout(() => {
          set({
            projects: newProjects,
            deleteProjectLoading: {},
          });
        }, 300);
      },
    }),
    {
      name: "projects",
    }
  )
);
