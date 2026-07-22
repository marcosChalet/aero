export default class ID {
  readonly value: string;

  constructor(id: string) {
    this.value = id;
  }

  equal(value: string) {
    return this.value === value;
  }

  generateUUID(): string {
    return crypto.randomUUID();
  }
}
