import { Token } from "./Token";
import { TokenType } from "./TokenType";

export enum Keyword {
  'let' = TokenType.LET,
  'function' = TokenType.FUNCTION,
  'return' = TokenType.RETURN,
  'true' = TokenType.TRUE,
  'false' = TokenType.FALSE,
  'if' = TokenType.IF,
  'else' = TokenType.ELSE
}

export function getKeywordTokenType(keyword: string): TokenType {
  
  switch (keyword) {
    case 'let':
      return TokenType.LET;

    case 'function':
      return TokenType.FUNCTION;

    case 'return':
      return TokenType.RETURN;

    case 'true':
      return TokenType.TRUE;
    
    case 'false':
      return TokenType.FALSE;

    case 'if':
      return TokenType.IF;

    case 'else':
      return TokenType.ELSE;

    default:
      throw `${keyword} is no an Enum.`;
  }
}
