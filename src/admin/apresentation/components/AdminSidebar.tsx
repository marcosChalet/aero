import {
  HiChartPie,
  HiClipboardCopy,
  HiDatabase,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import SidebarSh from "../../../shared/apresentation/components/SidebarSh";
import type { SidebarItemSh } from "../../../shared/apresentation/components/sidebarItemSh.types";

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

export default function AdminSidebar() {
  return <SidebarSh items={sidebarItems} />;
}
