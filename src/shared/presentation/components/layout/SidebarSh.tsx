import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { Link } from "react-router-dom";
import type { SidebarItemSh } from "./sidebarItemSh.types";

const customTheme = {
  root: {
    base: "h-full",
    inner: "bg-[#FAF9F6] text-white dark:bg-[#FAF9F6]",
  },
};

export default function SidebarSh({ items }: { items: SidebarItemSh[] }) {
  return (
    <Sidebar
      className="w-full border-r border-gray-200 bg-black! dark:bg-black!"
      aria-label="Default sidebar"
      theme={customTheme}
    >
      <SidebarItems className="">
        <SidebarItemGroup>
          {items.map((item: SidebarItemSh) => (
            <Link to={item.linkTo} key={item.linkTo}>
              <SidebarItem
                as={"div"}
                className={`font-semibold text-slate-700! hover:bg-black! hover:text-[#FAF9F6]! ${item.className}`}
                icon={item.icon}
              >
                {item.title}
              </SidebarItem>
            </Link>
          ))}
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
