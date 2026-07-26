export class Email {
  private readonly _value: string;

  private constructor(email: string) {
    this._value = email;
    Object.freeze(this); // Garante imutabilidade em tempo de execução
  }

  public static create(email: string): Email {
    const cleanedEmail = email?.trim().toLowerCase();

    if (!this.validate(cleanedEmail)) {
      throw new Error(`O valor "${email}" não é um e-mail válido.`);
    }

    return new Email(cleanedEmail);
  }

  private static validate(email: string): boolean {
    if (!email) return false;

    // Regex RFC 5322
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return regex.test(email) && email.length <= 255;
  }

  public get value(): string {
    return this._value;
  }

  public equals(other: Email): boolean {
    return this._value === other.value;
  }

  public get domain(): string {
    return this._value.split("@")[1];
  }

  public toString(): string {
    return this._value;
  }

  public toUpper(): string {
    return this._value.toUpperCase();
  }
}
