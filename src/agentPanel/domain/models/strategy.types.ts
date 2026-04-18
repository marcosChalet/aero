import type { IconType } from "react-icons";

export type AggregatorType =
  (typeof AggregatorType)[keyof typeof AggregatorType];
export const AggregatorType = {
  BLUE: 0,
  GREEN: 1,
  YELLOW: 2,
} as const;

export interface StrategyInput {
  id: string;
  label: string;
}

export interface StrategyAlert {
  id: string;
  label: string;
}

export interface StrategyChecklist {
  id: string;
  label: string;
  completed: boolean;
}

export interface StrategyDefault {
  values: Record<string, string>;
  agentName: string;
  // possivelmente adicionar mais coisas no futuro, como:
  // currentCategory: string;
  // currentTime: string;
}

export interface StrategyScript {
  id: string;
  label: string;
  content: (ctx: Record<string, string>) => string;
}

export interface StrategyLink {
  id: string;
  title: string;
  ref: string;
  href?: string;
  type: AggregatorType;
}

/** always typed as string */
export type BasePassengerValues = {
  name: string;
  gender: string;
  pnr: string;
  ticket: string;
};

export interface IServiceStrategy {
  icon: IconType;
  title: string;
  inputs: {
    id: string;
    label: string;
  }[];
  checklist: StrategyChecklist[];
  alerts: StrategyAlert[];
  scripts: StrategyScript[];
  links: StrategyLink[];

  /**
   * Validador síncrono que cruza os dados preenchidos com os scripts copiados
   * para retornar um array com os IDs das validações (alerts/checklist) concluídas.
   * @param values Estado atual dos inputs preenchidos pelo agente.
   * @param copiedScripts Array com os IDs dos roteiros que já foram copiados.
   * @returns Array de strings contendo os IDs das regras satisfeitas.
   */
  autoCheck: (
    values: Record<string, string>,
    copiedScripts: string[],
  ) => string[]; // retorna IDs completados
}
