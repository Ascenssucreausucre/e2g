import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/Default";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/game",
        element: <Game />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
