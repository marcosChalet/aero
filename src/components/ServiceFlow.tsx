import { ClipboardWithIcon } from "flowbite-react";
import type { CategoryStrategy } from "../domain/store/types";
import { useGlobalStore } from "../domain/store/useGlobalStore";

export default function ServiceFlow({
  strategy,
}: {
  strategy: CategoryStrategy;
}) {
  const { values, copiedScripts, setAsCopiedScript } = useGlobalStore();

  return (
    <div className="h-full">
      <h2 className="mb-7 text-xl font-bold text-gray-800 select-none">
        Fluxo de Atendimento
      </h2>

      {Object.entries(strategy.alerts).map(
        ([key, value]) =>
          !strategy.autoCheck(values, copiedScripts).includes(value.id) && (
            <div
              key={key}
              className="3xl:text-lg mt-2 rounded-sm bg-[#ff9a00]/10 p-2 text-sm text-gray-900 select-none"
            >
              <b>⚠️ Alerta: </b>
              {value.label}
            </div>
          ),
      )}

      <div className="my-8">
        <h3 className="text-lg font-semibold text-gray-800">
          Passos necessários
        </h3>
        {Object.entries(strategy.checklist).map(([key, value]) => (
          <div
            key={key}
            className="mt-2 rounded-sm bg-[#00ff9a]/10 p-2 text-sm text-gray-900 accent-[#2C048C] select-none"
          >
            <input
              type="checkbox"
              readOnly
              checked={strategy
                .autoCheck(values, copiedScripts)
                .includes(value.id)}
              id={key}
            />
            <label htmlFor={key} className="3xl:text-lg ml-2">
              {value.label}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Scripts</h3>
        {Object.entries(strategy.scripts).map(([key, data]) => (
          <div
            key={key}
            className="relative mt-2 rounded-sm bg-[#00ff9a]/10 p-2 text-sm text-gray-900 select-none"
            onClick={() => setAsCopiedScript(data.id)}
          >
            <p className="3xl:text-lg h-full w-full max-w-11/12">
              {data.label}
            </p>
            <ClipboardWithIcon
              className="3xl:h-7 3xl:w-7 absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 cursor-pointer bg-blue-200 hover:bg-[#2C048C]!"
              valueToCopy={data.content(values)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
