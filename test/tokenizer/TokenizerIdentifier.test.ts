import { describe, expect, it } from '@jest/globals';
import { Token } from '../../src/token/Token';
import { TokenType } from '../../src/token/TokenType';
import { Tokenizer } from '../../src/tokenizer/Tokenizer';

describe('Test Identifier and Keywords.', () => {
  const input = `
let x = 3;
let y = 5 - x;

function hello(x, y) {
  return x;
}

x = true;
y = false;

x > 3;
y < 4;
`;

  const expectedTokens = [
    new Token(TokenType.LET, 'let', 1, 2),
    new Token(TokenType.IDENTIFIER, 'x', 5, 2),
    new Token(TokenType.ASSIGN, '=', 7, 2),
    new Token(TokenType.INT, '3', 9, 2),
    new Token(TokenType.SEMICOLON, ';', 10, 2),

    new Token(TokenType.LET, 'let', 1, 3),
    new Token(TokenType.IDENTIFIER, 'y', 5, 3),
    new Token(TokenType.ASSIGN, '=', 7, 3),
    new Token(TokenType.INT, '5', 9, 3),
    new Token(TokenType.MINUS, '-', 11, 3),
    new Token(TokenType.IDENTIFIER, 'x', 13, 3),
    new Token(TokenType.SEMICOLON, ';', 14, 3),

    new Token(TokenType.FUNCTION, 'function', 1, 5),
    new Token(TokenType.IDENTIFIER, 'hello', 10, 5),
    new Token(TokenType.LPAREN, '(', 15, 5),
    new Token(TokenType.IDENTIFIER, 'x', 16, 5),
    new Token(TokenType.COMMA, ',', 17, 5),
    new Token(TokenType.IDENTIFIER, 'y', 19, 5),
    new Token(TokenType.RPAREN, ')', 20, 5),
    new Token(TokenType.LBRACE, '{', 22, 5),

    new Token(TokenType.RETURN, 'return', 3, 6),
    new Token(TokenType.IDENTIFIER, 'x', 10, 6),
    new Token(TokenType.SEMICOLON, ';', 11, 6),

    new Token(TokenType.RBRACE, '}', 1, 7),

    new Token(TokenType.IDENTIFIER, 'x', 1, 9),
    new Token(TokenType.ASSIGN, '=', 3, 9),
    new Token(TokenType.TRUE, 'true', 5, 9),
    new Token(TokenType.SEMICOLON, ';', 9, 9),

    new Token(TokenType.IDENTIFIER, 'y', 1, 10),
    new Token(TokenType.ASSIGN, '=', 3, 10),
    new Token(TokenType.FALSE, 'false', 5, 10),
    new Token(TokenType.SEMICOLON, ';', 10, 10),

    new Token(TokenType.IDENTIFIER, 'x', 1, 12),
    new Token(TokenType.GT, '>', 3, 12),
    new Token(TokenType.INT, '3', 5, 12),
    new Token(TokenType.SEMICOLON, ';', 6, 12),

    new Token(TokenType.IDENTIFIER, 'y', 1, 13),
    new Token(TokenType.LT, '<', 3, 13),
    new Token(TokenType.INT, '4', 5, 13),
    new Token(TokenType.SEMICOLON, ';', 6, 13),

    new Token(TokenType.EOF, null, 1, 14),
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

