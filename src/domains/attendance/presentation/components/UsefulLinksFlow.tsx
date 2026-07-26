import { ClipboardWithIcon } from "flowbite-react";
import { TagColor } from "../../../../shared/domain/types/TagColor";
import useAgentSetup from "../../application/hooks/useAgentSetup";

export default function UsefulLinksFlow() {
  const { agentLinks } = useAgentSetup();

  return (
    <div className="flex h-full w-full flex-col">
      <h2 className="mb-7 text-xl font-bold text-gray-800 select-none">
        Links Importantes
      </h2>
      <ul className="flex flex-col gap-1">
        {agentLinks.map((link) => (
          <li
            key={link.id.value}
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
                link.type === TagColor.BLUE
                  ? "bg-sky-500"
                  : link.type === TagColor.GREEN
                    ? "bg-green-600"
                    : link.type === TagColor.YELLOW
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
