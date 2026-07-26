import {
  Badge,
  Button,
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from "flowbite-react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useFlowStore } from "../../application/store/useFlowStore";
import useAgentSetup from "../../application/hooks/useAgentSetup";
import { Status } from "../../domain/types/status";
import Input from "../../../../shared/presentation/components/ui/Input";
import { Gender } from "../../domain/types/gender";
import ID from "../../../../shared/domain/value-objects/ID";

export default function ServiceInformationFlow() {
  const { status, updateValue, updateContext, values, logs } = useFlowStore();
  const { agentInputs } = useAgentSetup();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-7 flex h-fit items-center justify-between gap-x-2 select-none">
        <h2 className="text-xl font-bold text-gray-800 select-none">
          Informações
        </h2>

        <div className="3xl:scale-125 3xl:mr-3">
          {status === Status.FINISHED ? (
            <Badge color="success">FINALIZADO</Badge>
          ) : (
            <Badge color="warning">EM ANDAMENTO</Badge>
          )}
        </div>
      </div>
      <div className="3xl:text-lg flex w-full flex-wrap gap-3">
        {agentInputs.map((agentInput) => (
          <Input
            key={agentInput.id.value}
            label={agentInput.label}
            className="w-full"
            inputClassName="capitalize"
            labelClassName="min-w-17 select-none"
            onChange={(e) => {
              const id = agentInput.id;
              const value = e.target.value;

              updateValue(id, value);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              updateContext(id, agentInput.validate(value as any)); //////////////////
            }}
          />
        ))}
      </div>
      <div className="3xl:text-lg mt-3 flex w-full flex-row justify-center gap-2 text-sm">
        <label className="group flex w-full cursor-pointer items-center rounded-lg border border-gray-300 p-2 transition-all hover:bg-gray-50 has-checked:bg-blue-50">
          <div className="relative flex h-3 w-3 items-center justify-center rounded-full border border-gray-300 group-has-checked:border-0">
            <input
              type="radio"
              name={"gender"}
              value="woman"
              className="peer sr-only"
              checked={values.gender === Gender.FEMALE}
              onChange={() => updateValue(new ID("gender"), Gender.FEMALE)}
            />
            <div className="h-full w-full scale-0 rounded-full bg-blue-600 transition-transform peer-checked:scale-100"></div>
          </div>
          <span className="ml-3 font-medium text-gray-700 select-none group-has-checked:text-blue-700">
            Mulher
          </span>
        </label>

        <label className="group flex w-full cursor-pointer items-center rounded-lg border border-gray-300 p-2 transition-all hover:bg-gray-50 has-checked:bg-blue-50">
          <div className="relative flex h-3 w-3 items-center justify-center rounded-full border border-gray-300 group-has-checked:border-0">
            <input
              type="radio"
              name={"gender"}
              value="man"
              className="peer sr-only"
              checked={values.gender === Gender.MALE}
              onChange={() => updateValue(new ID("gender"), Gender.MALE)}
            />
            <div className="h-full w-full scale-0 rounded-full bg-blue-600 transition-transform peer-checked:scale-100"></div>
          </div>
          <span className="ml-3 font-medium text-gray-700 select-none group-has-checked:text-blue-700">
            Homem
          </span>
        </label>

        <label className="group flex w-full cursor-pointer items-center rounded-lg border border-gray-300 p-2 transition-all hover:bg-gray-50 has-checked:bg-blue-50">
          <div className="relative flex h-3 w-3 items-center justify-center rounded-full border border-gray-300 group-has-checked:border-0">
            <input
              type="radio"
              name={"gender"}
              value="unspecified"
              className="peer sr-only"
              checked={values.gender === Gender.OTHER}
              onChange={() => updateValue(new ID("gender"), Gender.OTHER)}
            />
            <div className="h-full w-full scale-0 rounded-full bg-blue-600 transition-transform peer-checked:scale-100" />
          </div>
          <span className="ml-3 font-medium text-gray-700 select-none group-has-checked:text-blue-700">
            Genérico
          </span>
        </label>
      </div>

      <div className="3xl:my-8 my-3 max-h-64 overflow-auto">
        <h3 className="3xl:text-2xl mb-1 font-semibold">
          Histórico de ações:{" "}
        </h3>
        {logs.length > 0 ? (
          <Timeline>
            <TimelineItem>
              <TimelinePoint />
              <TimelineContent>
                {logs.map((log) => (
                  <>
                    <TimelineTitle className="text-black!">
                      {log.title}
                    </TimelineTitle>
                    <TimelineTime>
                      {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "full",
                        timeStyle: "short",
                      }).format(log.timestamp)}
                    </TimelineTime>

                    <TimelineBody className="mt-2">{log.content}</TimelineBody>
                    {log.learnMoreUrl ? (
                      <a
                        href={log.learnMoreUrl}
                        target="_blank"
                        className="mb-5 flex h-fit w-fit hover:cursor-pointer"
                      >
                        <Button color="gray" className="hover:cursor-pointer">
                          Ver mais
                          <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </a>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        ) : (
          <p className="3xl:text-lg pt-2 text-sm font-semibold text-gray-700 uppercase">
            🤐 Sem informações
          </p>
        )}
      </div>
      <div className="mt-auto">
        <Button
          className="3xl:text-xl cursor-pointer duration-200 hover:bg-black! focus:ring-0"
          color="green"
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
}
