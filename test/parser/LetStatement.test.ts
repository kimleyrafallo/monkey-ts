import { describe, expect, it, test } from '@jest/globals';
import { Tokenizer } from '../../src/tokenizer/Tokenizer';
import { Parser } from '../../src/parser/Parser';
import { Statement } from '../../src/parser/Ast';
import { Error } from '../../src/tokenizer/TokenizerError';

describe('Test LetStatement with Identifier.', () => {
  const input = `
let x = 4;
`;
//let myNumber = 234;
//let message = 'hello'; 
  const expectedStatements = [
    `let x = 4`,
    //`let myNumber = 234`,
    //`let message = 'hello`
  ];

  let tokenizer = new Tokenizer(input);
  
  let parser = new Parser(tokenizer);

  let statements: Array<Statement> = parser.parse();
  let errors: Array<Error> = parser.getErrors();

  test('Parser has no errors', () => {
    for (const e of errors) {
      console.log(e.message);
    }
    expect(errors.length).toBeLessThan(1);
  });

  for (let i = 0; i < expectedStatements.length; i++) {
    const expectedStatement = expectedStatements[i];
    const statement = statements[i];

    test(`Testing input ${expectedStatement} if correctly parsed.`, () => {
      expect(statement.stringify()).toBe(expectedStatement);
    });   
  }
});
