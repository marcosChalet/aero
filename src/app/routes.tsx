/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import AdminPage from "./admin/page";

const Assistant = lazy(() => import("./agent/page"));
const TeamLeadPage = lazy(() => import("./team-lead/page"));
const DashboardTL = lazy(() => import("./team-lead/dashboard"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Assistant />,
  },
  { path: "contact", element: <p>Contact</p> },
  { path: "team", element: <p>Time</p> },
  { path: "news", element: <p>Novidades</p> },
  {
    path: "/leader",
    element: <TeamLeadPage />,
    children: [
      { path: "dashboard", element: <DashboardTL /> },
      { path: "kanban", element: <p>Kanban</p> },
      { path: "manage-teams", element: <p>Equipes</p> },
      { path: "macros", element: <p>Macros</p> },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      { path: "dashboard", element: <DashboardTL /> },
      { path: "kanban", element: <p>Kanban</p> },
      { path: "manage-teams", element: <p>Equipes</p> },
      { path: "macros", element: <p>Macros</p> },
      { path: "config-system", element: <p>Configurar Sistema</p> },
    ],
  },
];
