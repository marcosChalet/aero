import type GenericRegistry from "../../application/factories/GenericRegistry";
import type { IAgentAlertVO } from "../../domain/value-objects/AgentAlert";
import AgentAlert from "../../domain/value-objects/AgentAlert";
import type { IAgentCategoryVO } from "../../domain/value-objects/AgentCategory";
import AgentCategory from "../../domain/value-objects/AgentCategory";
import type { IAgentChecklistVO } from "../../domain/value-objects/AgentChecklist";
import AgentChecklist from "../../domain/value-objects/AgentChecklist";
import type { IAgentInputVO } from "../../domain/value-objects/AgentInput";
import AgentInputCPF from "../../domain/value-objects/AgentInputCPF";
import AgentInputName from "../../domain/value-objects/AgentInputName";
import AgentInputPNR from "../../domain/value-objects/AgentInputPNR";
import type { IAgentLinkVO } from "../../domain/value-objects/AgentLink";
import AgentLink from "../../domain/value-objects/AgentLink";
import type { IAgentScriptVO } from "../../domain/value-objects/AgentScript";
import AgentScript from "../../domain/value-objects/AgentScript";

export default class FactorySetup {
  public static init(
    categoryFactory: GenericRegistry<IAgentCategoryVO>,
    inputFactory: GenericRegistry<IAgentInputVO>,
    checklistFactory: GenericRegistry<IAgentChecklistVO>,
    alertFactory: GenericRegistry<IAgentAlertVO>,
    scriptFactory: GenericRegistry<IAgentScriptVO>,
    linkFactory: GenericRegistry<IAgentLinkVO>,
  ): void {
    console.log("[Bootstrap] Registrando Value Objects nas Fábricas...");

    // Registra os inputs (pode ter 30 ou 40 aqui)
    inputFactory.register("inputName", AgentInputName);
    inputFactory.register("inputCPF", AgentInputCPF);
    inputFactory.register("inputPNR", AgentInputPNR);

    // Registra os checklists
    checklistFactory.register("checklist_item", AgentChecklist);

    alertFactory.register("alert_item", AgentAlert);

    scriptFactory.register("script_item", AgentScript);

    linkFactory.register("link_item", AgentLink);

    categoryFactory.register("category_item", AgentCategory);
  }
}
