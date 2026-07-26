import type ID from "./ID";

export interface IAgentCategoryVO {
  id: ID;
  label: string;
  icon: string;
}

export default class AgentCategory implements IAgentCategoryVO {
  readonly id: ID;
  readonly label: string;
  readonly icon: string;

  constructor(id: ID, label: string, icon: string) {
    this.id = id;
    this.label = label;
    this.icon = icon;
  }
}
