import { useEffect, useState } from "react";
import { useFlowStore } from "../store/useFlowStore";
import type { IAgentInputVO } from "../../domain/value-objects/AgentInput";
import type { IAgentAlertVO } from "../../domain/value-objects/AgentAlert";
import type { IAgentScriptVO } from "../../domain/value-objects/AgentScript";
import type { IAgentLinkVO } from "../../domain/value-objects/AgentLink";
import type { IAgentChecklistVO } from "../../domain/value-objects/AgentChecklist";
import type { IAgentCategoryVO } from "../../domain/value-objects/AgentCategory";
import { mockDbResponseLATAM } from "../../../../app/mock.agent";
import {
  alertFactory,
  categoryFactory,
  checklistFactory,
  inputFactory,
  linkFactory,
  scriptFactory,
} from "../../infrastructure/bootstrap/agent-bootstrap";
import ID from "../../../../shared/domain/value-objects/ID";
import Rule from "../../../../shared/domain/value-objects/Rule";

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
