import { TokenType } from "./TokenType"

export class Token {
  tokenType: TokenType;
  literal: string | null;
  line: number;
  column: number;

  constructor (tokenType: TokenType, literal: string | null, line: number, column: number){
    this.tokenType = tokenType;
    this.literal = literal;
    this.line = line;
    this.column = column;
  }

  stringify(){
    return `type: ${this.tokenType}, literal: ${this.literal}`;
  }
}
