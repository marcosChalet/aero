import {
  HiChartPie,
  HiClipboardCopy,
  HiDatabase,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import type { SidebarItemSh } from "./sidebarItemSh.types";
import SidebarSh from "./SidebarSh";

const sidebarItems: SidebarItemSh[] = [
  { icon: HiChartPie, title: "Dashboard", linkTo: "dashboard" },
  { icon: HiViewBoards, title: "kanban", linkTo: "kanban" },
  { icon: HiUser, title: "Equipes", linkTo: "manage-teams" },
  { icon: HiClipboardCopy, title: "Macros", linkTo: "macros" },
  {
    icon: HiDatabase,
    title: "Gerenciar Sistema",
    linkTo: "config-system",
  },
];

// verificar esse SidebarItemSh e o SidebarSh

export default function AdminSidebar() {
  return <SidebarSh items={sidebarItems} />;
}
