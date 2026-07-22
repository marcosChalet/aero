import { useFlowStore } from "../../application/store/useFlowStore";
import FlexContainer from "../../../shared/apresentation/components/FlexContainer";
import Category from "../../../shared/apresentation/components/Category";
import ServiceMainFlow from "../../../shared/apresentation/components/ServiceMainFlow";
import ServiceInformationFlow from "../../../shared/apresentation/components/ServiceInformationFlow";
import UsefulLinksFlow from "../../../shared/apresentation/components/UsefulLinksFlow";
import Menu from "../../../shared/apresentation/components/Menu";
import useAgentSetup from "../hooks/useAgentSetup";
import { iconRegistry } from "../../../shared/infrastructure/iconRegistry";

export default function Assistant() {
  const { currentCategory, setCategory } = useFlowStore();
  const { agentCategories } = useAgentSetup();

  return (
    <main className="grid h-screen grid-rows-[80px_auto] overflow-hidden bg-[#FAF9F6]">
      <Menu />
      <div className="flex h-full flex-col overflow-auto">
        <section className="mb-2 flex w-full items-start justify-start">
          <h1 className="ml-9 text-center text-3xl font-bold capitalize">
            Página de assistente virtual
          </h1>
        </section>

        <section className="flex h-full items-start justify-start gap-5 overflow-auto pb-9">
          <FlexContainer className="grid grid-cols-2 place-content-start gap-2 rounded-xs p-5">
            {agentCategories.map((i) => (
              <Category
                id={i.id.value}
                key={i.id.value}
                icon={iconRegistry[i.icon]}
                title={i.label}
                selected={i.id.value === currentCategory}
                onClick={() => setCategory(i.id.value)}
              />
            ))}
          </FlexContainer>

          <FlexContainer>
            <ServiceMainFlow />
          </FlexContainer>

          <FlexContainer>
            <ServiceInformationFlow />
          </FlexContainer>

          <FlexContainer>
            <UsefulLinksFlow />
          </FlexContainer>
        </section>
      </div>
    </main>
  );
}
