import {
  HiChartPie,
  HiClipboardCopy,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

import type { SidebarItemSh } from "../../../shared/apresentation/components/sidebarItemSh.types";
import SidebarSh from "../../../shared/apresentation/components/SidebarSh";

const sidebarItems: SidebarItemSh[] = [
  { icon: HiChartPie, title: "Dashboard", linkTo: "dashboard" },
  { icon: HiViewBoards, title: "kanban", linkTo: "kanban" },
  { icon: HiUser, title: "Equipe", linkTo: "team" },
  { icon: HiClipboardCopy, title: "Macros", linkTo: "macros" },
];

export default function TeamLeadSidebar() {
  return <SidebarSh items={sidebarItems} />;
}
