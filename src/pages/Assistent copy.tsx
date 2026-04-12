import { useGlobalStore } from "../domain/store/useGlobalStore";
import { STRATEGIES } from "../domain/store/strategies";

export default function Assistent() {
  const {
    currentCategory,
    values,
    updateValue,
    setCategory,
    setAsCopiedScript,
    completedChecklistIds,
    resetStore,
  } = useGlobalStore();

  // 1. Descobre quais campos mostrar para a categoria atual
  const strategy = STRATEGIES[currentCategory];
  const inputsToShow = strategy.inputs;

  const handleCopy = (text: string, checkId: string) => {
    navigator.clipboard.writeText(text);
    setAsCopiedScript(checkId);
  };

  const handleFinalizar = () => {
    console.log("Salvando no banco os dados preenchidos:", values);
    resetStore();
  };

  return (
    <main className="grid h-screen grid-rows-[auto_1fr] bg-[#FAF9F6] px-4">
      <h1 className="ml-3 flex h-20 items-center justify-start text-3xl font-bold text-gray-800! capitalize">
        Página de assistente virtual
      </h1>

      <div>
        <nav>
          <button onClick={() => setCategory("REBOOKING")}>Rebooking</button>
          <button onClick={() => setCategory("UMNR")}>UMNR</button>
        </nav>

        <h3>Categoria: {currentCategory}</h3>

        {strategy.alerts.map((obj) => (
          <div key={obj.id}>
            <p>### {obj.id + " - " + obj.label}</p>
          </div>
        ))}

        {inputsToShow.map((config) => (
          <div key={config.id}>
            <label>{config.label}</label>
            <input
              // 2. Busca o valor no objeto global 'values' usando o ID do campo
              value={values[config.id] || ""}
              onChange={(e) => updateValue(config.id, e.target.value)}
            />
          </div>
        ))}

        <button onClick={() => handleCopy(`Olá ${values.name}`, "1")}>
          Copiar Script
        </button>

        <ul>
          {strategy.checklist.map((item) => (
            <li
              key={item.id}
              style={{
                color: completedChecklistIds.includes(item.id)
                  ? "green"
                  : "gray",
              }}
            >
              {completedChecklistIds.includes(item.id) ? "✅" : "⬜"}{" "}
              {item.label}
            </li>
          ))}
        </ul>

        <button onClick={handleFinalizar}>FINALIZAR</button>
      </div>
    </main>
  );
}
