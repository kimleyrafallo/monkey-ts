import { describe, expect, it } from '@jest/globals';
import { Token } from '../../src/token/Token';
import { TokenType } from '../../src/token/TokenType';
import { Error } from '../../src/tokenizer/TokenizerError';
import { Tokenizer } from '../../src/tokenizer/Tokenizer';

describe('Test Tokenizer Error: Illegal Character.', () => {
  const input = `()#@`;
  
  const expectedTokens = [
    new Token(TokenType.LPAREN, '(', 1, 1),
    new Token(TokenType.RPAREN, ')', 2, 1),
    new Token(TokenType.ILLEGAL, '#', 3, 1),
    new Token(TokenType.ILLEGAL, '@', 4, 1),
    
    new Token(TokenType.EOF, null, 5, 1)
  ];

  const expectedErrors = [
    new Error('Illegal character: #', 3, 1),
    new Error('Illegal character: @', 4, 1)
  ];
  

  let tokenizer = new Tokenizer(input);

  for (let i = 0; i < expectedTokens.length; i++) {
    const char = input[i];
    const expectedToken = expectedTokens[i];
    const nextToken = tokenizer.nextToken();
    
    it(`Token for ${char} should be ${expectedToken.stringify()}`, () => {
      expect(nextToken).toStrictEqual(expectedToken);
    });
  }
  
  const tokenizerErrors = tokenizer.getErrors();

  for (let i = 0; i < expectedErrors.length; i++) {
    const expectedError = expectedErrors[i];
    const tokenizerError = tokenizerErrors[i];

    it(`Tokenizer errors must contain ${expectedError.getErrorMessage()}`, () => {
      expect(tokenizerError).toStrictEqual(expectedError);
    });
  }

});
