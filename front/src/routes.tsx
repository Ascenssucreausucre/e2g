import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/Default";
import Home from "./pages/Home";
import Game from "./pages/Game";

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
    ],
  },
]);

export default router;
