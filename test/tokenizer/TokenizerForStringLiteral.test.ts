import { describe, expect, test } from '@jest/globals';
import { Token } from '../../src/token/Token';
import { TokenType } from '../../src/token/TokenType';
import { Tokenizer } from '../../src/tokenizer/Tokenizer';
  
describe('Monkey Language with String Literal.', () => {
  const input = `
let message = 'hello, world';
`;

  const expectedTokens = [
    new Token(TokenType.LET, 'let', 1, 2),
    new Token(TokenType.IDENTIFIER, 'message', 5, 2),
    new Token(TokenType.ASSIGN, '=', 13, 2),
    new Token(TokenType.STRING, 'hello, world', 15, 2),
    new Token(TokenType.SEMICOLON, ';', 29, 2),
  ];

  let tokenizer = new Tokenizer(input);

  for (let i = 0; i < expectedTokens.length; i++) {
    const expectedToken = expectedTokens[i];
    const nextToken = tokenizer.nextToken();

    test(`Token should be ${expectedToken.stringify()}`, ()=> {
      expect(nextToken).toStrictEqual(expectedToken);
    });
  }
});
