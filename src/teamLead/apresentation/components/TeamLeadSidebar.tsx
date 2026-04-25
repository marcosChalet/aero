import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import {
  HiChartPie,
  HiClipboardCopy,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const customTheme = {
  root: {
    base: "h-full",
    inner: "bg-[#FAF9F6] text-white dark:bg-[#FAF9F6]",
  },
};

export default function TeamLeadSidebar() {
  return (
    <Sidebar
      className="w-full border-r border-gray-200 bg-black! dark:bg-black!"
      aria-label="Default sidebar"
      theme={customTheme}
    >
      <SidebarItems className="">
        <SidebarItemGroup>
          <Link to="dashboard">
            <SidebarItem
              className="font-semibold text-slate-700! hover:bg-black! hover:text-[#FAF9F6]!"
              icon={HiChartPie}
            >
              Dashboard
            </SidebarItem>
          </Link>
          <Link to="kanban">
            <SidebarItem
              className="font-semibold text-slate-700! hover:bg-black! hover:text-[#FAF9F6]!"
              icon={HiViewBoards}
              labelColor="dark"
            >
              Kanban
            </SidebarItem>
          </Link>
          <Link to="equipe">
            <SidebarItem
              className="font-semibold text-slate-700! hover:bg-black! hover:text-[#FAF9F6]!"
              icon={HiUser}
            >
              Equipe
            </SidebarItem>
          </Link>
          <Link to="macros">
            <SidebarItem
              className="font-semibold text-slate-700! hover:bg-black! hover:text-[#FAF9F6]!"
              icon={HiClipboardCopy}
            >
              Macros
            </SidebarItem>
          </Link>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
