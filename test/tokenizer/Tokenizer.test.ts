import { describe, expect, it } from '@jest/globals';
import { Token } from '../../src/token/Token';
import { TokenType } from '../../src/token/TokenType';
import { Tokenizer } from '../../src/tokenizer/Tokenizer';

describe('Test column functionality of Tokenizer.', () => {
  const input: string = `=+
();`;

  console.warn(`INPUT LENGTH: ${input.length}`);

  const expectedNextTokens: Array<Token> = [
    new Token(TokenType.ASSIGN, '=', 1, 1),
    new Token(TokenType.PLUS, '+', 2, 1),
    new Token(TokenType.LPAREN, '(', 1, 2),
    new Token(TokenType.RPAREN, ')', 2, 2),
    new Token(TokenType.SEMICOLON, ';', 3, 2),

    new Token(TokenType.EOF, null, 4, 2),
  ];

  let tokenizer = new Tokenizer(input);

  for (let i = 0; i < expectedNextTokens.length; i++) {
    const expectedToken = expectedNextTokens[i];
    const nextToken = tokenizer.nextToken();
    const currChar = input[i];

    it(`Column should be ${expectedToken.column}`, () => {
      expect(nextToken.column).toBe(expectedToken.column);
    });

    it(`Token should be ${expectedToken.stringify()}`, () => {
      expect(nextToken).toEqual(expectedToken);
    });
  }
});

describe('Test nextToken for input =+(){},;', () => {
  const input: string = '=+(){},;';

  const expectedNextTokens: Array<Token> = [
    new Token(TokenType.ASSIGN, '=', 1, 1),
    new Token(TokenType.PLUS, '+', 2, 1),
    new Token(TokenType.LPAREN, '(', 3, 1),
    new Token(TokenType.RPAREN, ')', 4, 1),
    new Token(TokenType.LBRACE, '{', 5, 1),
    new Token(TokenType.RBRACE, '}', 6, 1),
    new Token(TokenType.COMMA, ',', 7, 1),
    new Token(TokenType.SEMICOLON, ';', 8, 1),

    new Token(TokenType.EOF, null, 9, 1),
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

describe('Test Non-single character of Tokenizer.', () => {
  const input = `
x != 3;
y == 5;
`;
  
  const expectedTokens = [
    new Token(TokenType.IDENTIFIER, 'x', 1, 2),
    new Token(TokenType.NOTEQ, '!=', 3, 2),
    new Token(TokenType.INT, '3', 6, 2),
    new Token(TokenType.SEMICOLON, ';', 7, 2),

    new Token(TokenType.IDENTIFIER, 'y', 1, 3),
    new Token(TokenType.EQ, '==', 3, 3),
    new Token(TokenType.INT, '5', 6, 3),
    new Token(TokenType.SEMICOLON, ';', 7, 3),

    new Token(TokenType.EOF, null, 1, 4)
  ];
  
  let tokenizer = new Tokenizer(input);

  for (let i = 0; i < expectedTokens.length; i++) {
    const expectedToken = expectedTokens[i];
    const nextToken = tokenizer.nextToken();

    it(`Token should be ${expectedToken.stringify()}`, () => {
      expect(nextToken).toEqual(expectedToken);
    });
  }
});
