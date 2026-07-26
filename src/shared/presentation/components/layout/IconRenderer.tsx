import type { IconType } from "react-icons";
import { iconRegistry } from "../../../infrastructure/iconRegistry";

interface IconProps {
  id: string;
  name: string;
  title: string;
  size?: number;
  selected?: boolean;
  onClick: React.Dispatch<React.SetStateAction<string>>;
}

export default function IconRenderer({
  id,
  name,
  title,
  selected,
  onClick,
}: IconProps) {
  const Icon: IconType = iconRegistry[name];

  <div
    onClick={() => onClick(id)}
    className={`3xl:h-36 3xl:w-52 flex h-30 w-44 flex-col flex-wrap items-center justify-center rounded-sm text-center text-gray-200 select-none hover:cursor-pointer ${selected ? "bg-[#EB1453]" : "bg-gray-900 hover:bg-black"} `}
  >
    {Icon && <Icon className="mb-1 h-12 w-12" />}
    <p className="3xl:text-lg text-sm font-bold text-wrap uppercase">{title}</p>
  </div>;
}
