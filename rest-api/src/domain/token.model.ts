export class Token {
  constructor(public sub: string, public username: string, public iat: number, public exp: number) {
  }
}
