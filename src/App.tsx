import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import PageProjects from "./page/PageProjects";
import PageTasks from "./page/PageTasks";

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
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
