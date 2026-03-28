import { createBrowserRouter } from "react-router";
import App from "../App";
import StartPage from "../pages/StartPage";
import GamePage from "../pages/GamePage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <StartPage />,
      },
      {
        path: "game/:userId",
        element: <GamePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
