import { describe, expect, it, test } from '@jest/globals';
import { Token } from '../../src/token/Token';
import { TokenType } from '../../src/token/TokenType';
import { Tokenizer } from '../../src/tokenizer/Tokenizer';

describe('Test nextToken for input =+(){},;', () => {
  // Setup
  const input: string = '=+(){},;';

  const expectedNextTokens: Array<Token> = [
    new Token(TokenType.ASSIGN, '='),
    new Token(TokenType.PLUS, '+'),
    new Token(TokenType.LPAREN, '('),
    new Token(TokenType.RPAREN, ')'),
    new Token(TokenType.LBRACE, '{'),
    new Token(TokenType.RBRACE, '}'),
    new Token(TokenType.COMMA, ','),
    new Token(TokenType.SEMICOLON, ';'),

    new Token(TokenType.EOF, null),
  ];


  let tokenizer = new Tokenizer(input);

  for (let i = 0; i < expectedNextTokens.length; i++) {
    const expectedToken = expectedNextTokens[i];
    const nextToken = tokenizer.nextToken();
    const currChar = input[i];

    it(`Token for ${currChar} should be ${expectedToken.stringify()}`, () => {
      expect(nextToken).toEqual(expectedToken);
    });
  }
});
