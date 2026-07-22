import { useEffect, useState } from "react";
import type { IAgentInputVO } from "../../../shared/value-objects/AgentInput";
import { mockDbResponseLATAM } from "../pages/mock.agent";
import type { IAgentChecklistVO } from "../../../shared/value-objects/AgentChecklist";
import {
  categoryFactory,
  alertFactory,
  checklistFactory,
  inputFactory,
  linkFactory,
  scriptFactory,
} from "../../infrastructure/bootstrap/agent-bootstrap";
import type { IAgentAlertVO } from "../../../shared/value-objects/AgentAlert";
import type { IAgentScriptVO } from "../../../shared/value-objects/AgentScript";
import type { IAgentLinkVO } from "../../../shared/value-objects/AgentLink";
import type { IAgentCategoryVO } from "../../../shared/value-objects/AgentCategory";
import ID from "../../../shared/value-objects/ID";
import { useFlowStore } from "../../application/store/useFlowStore";
import Rule from "../../../shared/value-objects/Rule";

export default function useAgentSetup() {
  const { currentCategory } = useFlowStore();
  const [agentInputs, setAgentInputs] = useState<IAgentInputVO[]>([]);
  const [agentAlerts, setAgentAlerts] = useState<IAgentAlertVO[]>([]);
  const [agentScripts, setAgentScripts] = useState<IAgentScriptVO[]>([]);
  const [agentLinks, setAgentLinks] = useState<IAgentLinkVO[]>([]);
  const [agentChecklists, setAgentChecklists] = useState<IAgentChecklistVO[]>(
    [],
  );
  const [agentCategories, setAgentCategories] = useState<IAgentCategoryVO[]>(
    [],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAgentCategories(
      mockDbResponseLATAM.map((i) =>
        categoryFactory.create("category_item", new ID(i.id), i.title, i.icon),
      ),
    );

    setAgentInputs(
      mockDbResponseLATAM
        .find((item) => item.id === currentCategory)
        ?.inputs.map((i) =>
          inputFactory.create(i.inputRegistryParam, new ID(i.id), i.label),
        ) ?? [],
    );

    setAgentChecklists(
      mockDbResponseLATAM
        .find((item) => item.id === currentCategory)
        ?.checklists.map((c) =>
          checklistFactory.create(
            "checklist_item",
            new ID(c.id),
            c.label,
            new Rule(c.rule),
          ),
        ) ?? [],
    );

    setAgentAlerts(
      mockDbResponseLATAM
        .find((item) => item.id === currentCategory)
        ?.alerts.map((a) =>
          alertFactory.create(
            "alert_item",
            new ID(a.id),
            a.label,
            new Rule(a.rule),
          ),
        ) ?? [],
    );

    setAgentScripts(
      mockDbResponseLATAM
        .find((item) => item.id === currentCategory)
        ?.scripts.map((s) =>
          scriptFactory.create("script_item", new ID(s.id), s.label, s.content),
        ) ?? [],
    );

    setAgentLinks(
      mockDbResponseLATAM
        .find((item) => item.id === currentCategory)
        ?.links.map((l) =>
          linkFactory.create("link_item", new ID(l.id), l.label, l.ref, l.type),
        ) ?? [],
    );
  }, [currentCategory]);

  return {
    agentCategories,
    agentInputs,
    agentChecklists,
    agentAlerts,
    agentScripts,
    agentLinks,
  };
}
