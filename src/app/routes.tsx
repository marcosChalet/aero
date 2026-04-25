/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Assistant = lazy(
  () => import("../agentPanel/apresentation/pages/Assistant"),
);
const TeamLeadPage = lazy(
  () => import("../teamLead/apresentation/pages/TeamLeadPage"),
);
const DashboardTL = lazy(
  () => import("../teamLead/apresentation/pages/DashboardTL"),
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Assistant />,
  },
  {
    path: "/leader",
    element: <TeamLeadPage />,
    children: [
      { path: "dashboard", element: <DashboardTL /> },
      { path: "contact", element: <p>Contact</p> },
      { path: "team", element: <p>Time</p> },
      { path: "news", element: <p>Novidades</p> },
    ],
  },
];
