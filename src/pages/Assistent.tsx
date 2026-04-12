import { useGlobalStore } from "../domain/store/useGlobalStore";
import { STRATEGIES } from "../domain/store/strategies";
import FlexContainer from "../components/FlexContainer";
import Category from "../components/Category";
import ServiceFlow from "../components/ServiceFlow";
import ServiceSummary from "../components/ServiceSummary";
import UsefulLinks from "../components/UsefulLinks";

export default function Assistent() {
  const { currentCategory, setCategory } = useGlobalStore();
  const strategy = STRATEGIES[currentCategory];

  return (
    <main className="mx-2 grid h-screen grid-rows-[80px_auto] overflow-hidden bg-[#FAF9F6]">
      <section className="flex h-full w-full items-center justify-start">
        <h1 className="ml-9 text-center text-3xl font-bold capitalize">
          Página de assistente virtual
        </h1>
      </section>

      <section className="flex h-full justify-start gap-5 overflow-auto pb-9">
        <FlexContainer className="grid grid-cols-2 place-content-start gap-2 rounded-xs p-5">
          {Object.entries(STRATEGIES).map(([key, strategy]) => {
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
          <ServiceFlow strategy={strategy} />
        </FlexContainer>

        <FlexContainer className="p-5">
          <ServiceSummary strategy={strategy} />
        </FlexContainer>

        <FlexContainer className="p-5">
          <UsefulLinks strategy={strategy} />
        </FlexContainer>
      </section>
    </main>
  );
}
