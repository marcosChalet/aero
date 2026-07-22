import AgentAlert, {
  type IAgentAlertVO,
} from "../../../shared/value-objects/AgentAlert";
import type { IAgentCategoryVO } from "../../../shared/value-objects/AgentCategory";
import AgentCategory from "../../../shared/value-objects/AgentCategory";
import type { IAgentChecklistVO } from "../../../shared/value-objects/AgentChecklist";
import AgentChecklist from "../../../shared/value-objects/AgentChecklist";
import type { IAgentInputVO } from "../../../shared/value-objects/AgentInput";
import AgentInputCPF from "../../../shared/value-objects/AgentInputCPF";
import AgentInputName from "../../../shared/value-objects/AgentInputName";
import AgentInputPNR from "../../../shared/value-objects/AgentInputPNR";
import type { IAgentLinkVO } from "../../../shared/value-objects/AgentLink";
import AgentLink from "../../../shared/value-objects/AgentLink";
import type { IAgentScriptVO } from "../../../shared/value-objects/AgentScript";
import AgentScript from "../../../shared/value-objects/AgentScript";
import type GenericRegistry from "../../application/factories/GenericRegistry";

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
