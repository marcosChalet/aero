import type { IAgentAlertVO } from "../../../shared/value-objects/AgentAlert";
import type { IAgentCategoryVO } from "../../../shared/value-objects/AgentCategory";
import type { IAgentChecklistVO } from "../../../shared/value-objects/AgentChecklist";
import type { IAgentInputVO } from "../../../shared/value-objects/AgentInput";
import type { IAgentLinkVO } from "../../../shared/value-objects/AgentLink";
import type { IAgentScriptVO } from "../../../shared/value-objects/AgentScript";
import GenericRegistry from "../../application/factories/GenericRegistry";
import FactorySetup from "./FactorySetup"; // Ajuste o caminho se necessário

export const categoryFactory = new GenericRegistry<IAgentCategoryVO>();
export const inputFactory = new GenericRegistry<IAgentInputVO>();
export const checklistFactory = new GenericRegistry<IAgentChecklistVO>();
export const alertFactory = new GenericRegistry<IAgentAlertVO>();
export const scriptFactory = new GenericRegistry<IAgentScriptVO>();
export const linkFactory = new GenericRegistry<IAgentLinkVO>();

FactorySetup.init(
  categoryFactory,
  inputFactory,
  checklistFactory,
  alertFactory,
  scriptFactory,
  linkFactory,
);
