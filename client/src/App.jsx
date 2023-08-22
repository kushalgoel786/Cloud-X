import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Landing,
  Root,
  Login,
  Register,
  Error,
  Dashboard,
  Files,
  Upload,
  File,
  Profile,
} from "./pages";

// ACTIONS
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as uploadAction } from "./pages/Upload";
import { action as deleteFileAction } from "./pages/DeleteFile.jsx";

// LOADERS
import { loader as dashboardLoader } from "./pages/Dashboard";
import { loader as filesLoader } from "./pages/Files";
import { loader as fileLoader } from "./pages/File";

// ROUTES
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Files />,
            loader: filesLoader,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "upload",
            element: <Upload />,
            action: uploadAction,
          },
          {
            path: "file/:id",
            element: <File />,
            loader: fileLoader,
          },
          {
            path: "delete-file/:id", 
            action: deleteFileAction,
          }
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
