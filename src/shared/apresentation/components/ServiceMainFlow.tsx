import { ClipboardWithIcon } from "flowbite-react";
import { useFlowStore } from "../../../agentPanel/application/store/useFlowStore";
import { evaluate } from "../../../core/rule-engine";
import useAgentSetup from "../../../agentPanel/apresentation/hooks/useAgentSetup";

export default function ServiceMainFlow() {
  const { context, setAsCopiedScript } = useFlowStore();
  const { agentChecklists, agentAlerts, agentScripts } = useAgentSetup();

  return (
    <div className="h-full w-full">
      <h2 className="mb-7 text-xl font-bold text-gray-800 select-none">
        Fluxo de Atendimento
      </h2>

      {agentAlerts &&
        agentAlerts.map(
          (agentAlert) =>
            !evaluate(agentAlert.rule.value, context) && (
              <div
                key={agentAlert.id.value}
                className="3xl:text-lg mt-2 rounded-sm bg-[#ff9a00]/10 p-2 text-sm text-gray-900 select-none"
              >
                <b>⚠️ Alerta: </b>
                {agentAlert.label}
              </div>
            ),
        )}

      <div className="my-8">
        <h3 className="text-lg font-semibold text-gray-800">
          Passos necessários
        </h3>

        {agentChecklists.map((checkItem) => (
          <div
            key={checkItem.id.value}
            className="mt-2 rounded-sm bg-[#00ff9a]/10 p-2 text-sm text-gray-900 accent-[#2C048C] select-none"
          >
            <input
              type="checkbox"
              readOnly
              checked={evaluate(checkItem.rule?.value, context)}
              id={checkItem.id.value}
            />
            <label htmlFor={checkItem.id.value} className="3xl:text-lg ml-2">
              {checkItem.label}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Scripts</h3>
        {agentScripts.map((script) => (
          <div
            key={script.id.value}
            className="relative mt-2 rounded-sm bg-[#00ff9a]/10 p-2 text-sm text-gray-900 select-none"
            onClick={() => setAsCopiedScript(script.id)}
          >
            <p className="3xl:text-lg h-full w-full max-w-11/12">
              {script.label}
            </p>
            <ClipboardWithIcon
              className="3xl:h-7 3xl:w-7 absolute top-1/2 right-0 mr-2 h-6 w-6 -translate-y-1/2 cursor-pointer bg-blue-200 hover:bg-[#2C048C]!"
              valueToCopy={script.getContent()}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
