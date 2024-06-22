import { describe, expect, it } from '@jest/globals';
import { Token } from '../../src/token/Token';
import { TokenType } from '../../src/token/TokenType';
import { Tokenizer } from '../../src/tokenizer/Tokenizer';

describe('Test Tokenizer Whitespace', () => {
  const input = `
() +=

-;
`;

  const expectedTokens = [
    new Token(TokenType.LPAREN, '(', 1, 2),
    new Token(TokenType.RPAREN, ')', 2, 2),
    new Token(TokenType.PLUS, '+', 4, 2),
    new Token(TokenType.ASSIGN, '=', 5, 2),
    new Token(TokenType.MINUS, '-', 1, 4),
    new Token(TokenType.SEMICOLON, ';', 2, 4),
    new Token(TokenType.EOF, null, 1, 5),
  ];

  let tokenizer = new Tokenizer(input);
  
  for (let i = 0; i < expectedTokens.length; i++) {
    const expectedToken = expectedTokens[i];
    const nextToken = tokenizer.nextToken();

    it(`Token should be ${expectedToken.stringify()}`, ()=> {
      expect(nextToken).toStrictEqual(expectedToken);
    });
  }

});
