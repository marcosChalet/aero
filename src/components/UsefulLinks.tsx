import { ClipboardWithIcon } from "flowbite-react";
import { AggregatorType } from "../domain/types/aggregator";
import type { CategoryStrategy, Link } from "../domain/store/types";

export default function UsefulLinks({
  strategy,
}: {
  strategy: CategoryStrategy;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <h2 className="mb-7 text-xl font-bold text-gray-800 select-none">
        Links Importantes
      </h2>
      <ul className="flex flex-col gap-1">
        {strategy.links.map((link: Link) => (
          <li
            key={link.id}
            className="relative cursor-pointer rounded-lg border border-gray-300 p-3 transition duration-300 hover:bg-gray-50"
          >
            <a
              target="_blank"
              className="3xl:text-lg flex h-full w-full justify-between text-sm font-bold"
              href={link.ref}
            >
              <div className="3xl:ml-2 capitalize">{link.title}</div>
            </a>
            <div
              className={`3xl:h-3 3xl:w-3 absolute top-1 left-1 h-2 w-2 animate-pulse rounded-full ${
                link.type === AggregatorType.BLUE
                  ? "bg-sky-500"
                  : link.type === AggregatorType.GREEN
                    ? "bg-green-600"
                    : link.type === AggregatorType.YELLOW
                      ? "bg-yellow-300"
                      : "bg-sky-500"
              } `}
            />
            <ClipboardWithIcon
              className="3xl:h-7 3xl:w-7 h-6 w-6 cursor-pointer bg-blue-200 hover:bg-[#2C048C]!"
              valueToCopy={link.ref}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
