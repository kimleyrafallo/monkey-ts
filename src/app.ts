import { Token } from "./token/Token";
import { TokenType } from "./token/TokenType";
import { Tokenizer } from "./tokenizer/Tokenizer";

const input = `
let x = y;
let y = z - x;
`;

let tokenizer = new Tokenizer(input);

let i = input.length;

while (i) {
  const nextToken = tokenizer.nextToken();
  console.log(`Token: ${JSON.stringify(nextToken)}`);
  i--;
}


