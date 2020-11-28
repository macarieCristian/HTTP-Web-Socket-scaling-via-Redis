export class TokenDtoOut {
  constructor(public idToken: string) {
  }

  static toDto(token: string): TokenDtoOut {
    return new TokenDtoOut(token);
  }
}
