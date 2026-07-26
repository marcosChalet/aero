import {
  HiChartPie,
  HiClipboardCopy,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

import SidebarSh from "./SidebarSh";
import type { SidebarItemSh } from "./sidebarItemSh.types";

const sidebarItems: SidebarItemSh[] = [
  { icon: HiChartPie, title: "Dashboard", linkTo: "dashboard" },
  { icon: HiViewBoards, title: "kanban", linkTo: "kanban" },
  { icon: HiUser, title: "Equipes", linkTo: "manage-teams" },
  { icon: HiClipboardCopy, title: "Macros", linkTo: "macros" },
];

export default function TeamLeadSidebar() {
  return <SidebarSh items={sidebarItems} />;
}
