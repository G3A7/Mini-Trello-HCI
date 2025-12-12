import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import PageProjects from "./page/PageProjects";
import PageTasks from "./page/PageTasks";
import CreateProject from "./components/CreateProject";
import CreateTask from "./components/CreateTask";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <PageProjects />,
        },
        {
          path: "/project/:id",
          element: <PageTasks />,
        },
        {
          path: "/create-project",
          element: <CreateProject />,
        },
        {
          path: "/create-task",
          element: <CreateTask />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
