import type { TagColor } from "../../../../shared/domain/types/TagColor";
import type ID from "../../../../shared/domain/value-objects/ID";

export interface IAgentLinkVO {
  id: ID;
  title: string;
  ref: string;
  type: TagColor;
}

export default class AgentLink implements IAgentLinkVO {
  readonly id: ID;
  readonly title: string;
  readonly ref: string;
  readonly type: TagColor;

  constructor(id: ID, title: string, ref: string, type: TagColor) {
    this.id = id;
    this.title = title;
    this.ref = ref;
    this.type = type;
  }
}
