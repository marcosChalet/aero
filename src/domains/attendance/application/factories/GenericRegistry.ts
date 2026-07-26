/* eslint-disable @typescript-eslint/no-explicit-any */
type Constructor<T> = new (...args: any[]) => T;

export default class GenericRegistry<T> {
  private registry = new Map<string, Constructor<T>>();

  public register(type: string, constructor: Constructor<T>): void {
    this.registry.set(type, constructor);
  }

  public create(type: string, ...args: any[]) {
    const Constructor = this.registry.get(type);
    if (!Constructor) {
      throw new Error(`Tipo '${type}' não registrado na fábrica genérica.`);
    }
    return new Constructor(...args);
  }
}
