import type { IconType } from "react-icons";

export default function Category({
  id,
  title,
  icon: Icon,
  selected = false,
  onClick,
}: {
  id: string;
  title?: string;
  icon?: IconType;
  selected?: boolean;
  onClick: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      id={id}
      onClick={() => onClick(id)}
      className={`3xl:h-36 3xl:w-52 flex h-30 w-44 flex-col flex-wrap items-center justify-center rounded-sm text-center text-gray-200 select-none hover:cursor-pointer ${selected ? "bg-[#EB1453]" : "bg-gray-900 hover:bg-black"} `}
    >
      {Icon && <Icon className="mb-1 h-12 w-12" />}
      <p className="3xl:text-lg text-sm font-bold text-wrap uppercase">
        {title}
      </p>
    </div>
  );
}
