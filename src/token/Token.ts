import { TokenType } from "./TokenType"

export class Token {
  tokenType: TokenType;
  literal: string | null;

  constructor(tokenType: TokenType, literal: string | null){
    this.tokenType = tokenType;
    this.literal = literal;
  }

  stringify(){
    return `type: ${this.tokenType}, literal: ${this.literal}`;
  }
}
