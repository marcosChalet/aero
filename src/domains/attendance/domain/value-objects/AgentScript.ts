import type ID from "../../../../shared/domain/value-objects/ID";

type LabelType = string;
type ContentType = string;

export interface IAgentScriptVO {
  id: ID;
  label: LabelType;
  content: ContentType;
  getContent: () => string;
}

export default class AgentScript implements IAgentScriptVO {
  readonly id: ID;
  readonly label: LabelType;
  readonly content: ContentType;
  private _copied: boolean;

  constructor(id: ID, label: LabelType, content: ContentType) {
    this.id = id;
    this.label = label;
    this.content = content;
    this._copied = false;
  }

  get isCopied() {
    return this._copied;
  }

  copy() {
    this._copied = true;
    return this.content;
  }

  getContent() {
    return this.content;
  }
}
