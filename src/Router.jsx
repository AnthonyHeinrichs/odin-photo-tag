import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Game from "./pages/Game"
import Leaderboard from "./pages/Leaderboard"

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "game/:name",
      element: <Game />,
    },
    {
      path: "leaderboard",
      element: <Leaderboard />
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;