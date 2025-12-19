import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import PageProjects from "./page/PageProjects";
import PageTasks from "./page/PageTasks";
import CreateTask from "./components/CreateTask";
import CreateProject from "./components/CreateProject";
import NotFound from "./components/NotFound";

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
          path: "/create-task",
          element: <CreateTask />,
        },
        {
          path: "/create-project",
          element: <CreateProject />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
