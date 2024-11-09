import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeScreen } from "./pages/Home";
import { LeaderboardPage } from "./pages/Leaderboard";
import "./index.css";
import { UserPage } from "./pages/UserPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./common/api";
import { DashboardPage } from "./pages/DashboardPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "",
    element: <HomeScreen />,
  },
  {
    path: "/leaderboard",
    element: <LeaderboardPage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
