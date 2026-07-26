import type { IAgentChecklistVO } from "../../domain/value-objects/AgentChecklist";
import type { IAgentCategoryVO } from "../../domain/value-objects/AgentCategory";
import type { IAgentScriptVO } from "../../domain/value-objects/AgentScript";
import type { IAgentAlertVO } from "../../domain/value-objects/AgentAlert";
import type { IAgentInputVO } from "../../domain/value-objects/AgentInput";
import GenericRegistry from "../../application/factories/GenericRegistry";
import type { IAgentLinkVO } from "../../domain/value-objects/AgentLink";
import FactorySetup from "./FactorySetup";

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
