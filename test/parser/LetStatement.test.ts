import { describe, expect, it, test } from '@jest/globals';
import { Tokenizer } from '../../src/tokenizer/Tokenizer';

describe('Test LetStatement with Identifier.', () => {
  const input = `
let x = 'hello';
`;

  let tokenizer = new Tokenizer(input);
  
  test('haha sample test', () => {
    expect(true).toBeTruthy();
  });
});
