// import type { IconType } from "react-icons";
// import type AgentScript from "../../../shared/value-objects/AgentScript";
// import type AgentInput from "../../../shared/value-objects/AgentInput";
// import type AgentAlert from "../../../shared/value-objects/AgentAlert";
// import type AgentChecklist from "../../../shared/value-objects/AgentChecklist";
// import type AgentLink from "../../../shared/value-objects/AgentLink";

// export type AggregatorType =
//   (typeof AggregatorType)[keyof typeof AggregatorType];
// export const AggregatorType = {
//   BLUE: 0,
//   GREEN: 1,
//   YELLOW: 2,
// } as const;

// export interface StrategyInput {
//   id: string;
//   label: string;
// }

// export interface StrategyAlert {
//   id: string;
//   label: string;
//   rule?: string; // opcional temporário
// }

// export interface StrategyChecklist {
//   id: string;
//   label: string;
//   completed: boolean;
//   rule?: string; // opcional temporário
// }

// export interface StrategyDefault {
//   values: Record<string, string>;
//   agentName: string;
//   // possivelmente adicionar mais coisas no futuro, como:
//   // currentCategory: string;
//   // currentTime: string;
// }

// // export interface StrategyScript {
// //   id: string;
// //   label: string;
// //   content: (ctx: Record<string, string>) => string;
// // }

// export interface StrategyLink {
//   id: string;
//   title: string;
//   ref: string;
//   href?: string;
//   type: AggregatorType;
// }

// /** always typed as string */
// export type BasePassengerValues = {
//   name: string;
//   gender: string;
//   pnr: string;
//   ticket: string;
// };

// export interface IServiceStrategy {
//   icon: IconType;
//   title: string;
//   inputs: AgentInput[];
//   checklist: AgentChecklist[];
//   alerts: AgentAlert[]; /////////
//   scripts: AgentScript[]; //////////
//   links: AgentLink[]; ///////
// }
