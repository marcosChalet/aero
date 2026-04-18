import { useFlowStore } from "../../application/store/useFlowStore";
import { ServiceStrategies } from "../../domain/strategies";
import FlexContainer from "../../../shared/apresentation/components/FlexContainer";
import Category from "../../../shared/apresentation/components/Category";
import ServiceMainFlow from "../../../shared/apresentation/components/ServiceMainFlow";
import ServiceInformationFlow from "../../../shared/apresentation/components/ServiceInformationFlow";
import UsefulLinksFlow from "../../../shared/apresentation/components/UsefulLinksFlow";

export default function Assistant() {
  const { currentCategory, setCategory } = useFlowStore();
  const strategy = ServiceStrategies[currentCategory];

  return (
    <main className="mx-2 grid h-screen grid-rows-[80px_auto] overflow-hidden bg-[#FAF9F6]">
      <section className="flex h-full w-full items-center justify-start">
        <h1 className="ml-9 text-center text-3xl font-bold capitalize">
          Página de assistente virtual
        </h1>
      </section>

      <section className="flex h-full justify-start gap-5 overflow-auto pb-9">
        <FlexContainer className="grid grid-cols-2 place-content-start gap-2 rounded-xs p-5">
          {Object.entries(ServiceStrategies).map(([key, strategy]) => {
            return (
              <Category
                id={key}
                key={key}
                icon={strategy.icon}
                title={strategy.title}
                selected={key === currentCategory}
                onClick={() => setCategory(key)}
              />
            );
          })}
        </FlexContainer>

        <FlexContainer className="p-5">
          <ServiceMainFlow strategy={strategy} />
        </FlexContainer>

        <FlexContainer className="p-5">
          <ServiceInformationFlow strategy={strategy} />
        </FlexContainer>

        <FlexContainer className="p-5">
          <UsefulLinksFlow strategy={strategy} />
        </FlexContainer>
      </section>
    </main>
  );
}
