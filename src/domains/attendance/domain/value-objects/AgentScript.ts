import type ID from "../../../../shared/domain/value-objects/ID";
import type Label from "../../../../shared/domain/value-objects/Label";

type ContentType = string;

export interface IAgentScriptVO {
  id: ID;
  label: Label;
  content: ContentType;
  getContent: () => string;
}

export default class AgentScript implements IAgentScriptVO {
  readonly id: ID;
  readonly label: Label;
  readonly content: ContentType;
  private _copied: boolean;

  constructor(id: ID, label: Label, content: ContentType) {
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
