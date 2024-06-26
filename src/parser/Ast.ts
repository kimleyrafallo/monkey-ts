import { Token } from "../token/Token";

export class Program {
  private statements: Array<Statement> = [];
  
  addStatement(statement: Statement) {
    this.statements.push(statement);
  }
  
  getStatement(): Array<Statement> {
    return this.statements;
  }

  stringify(): string {
      return "test";
  }
}

export interface Statement {
  tokenliteral(): string | null;
  stringify(): string;
}

export class Expression implements Statement {
  tokenliteral(): string {
    return "";
  }

  stringify(): string {
    return "";
  }
}

export class LetStatement implements Statement {
  private token: Token;
  private identifier: Identifier;
  private expression: Expression;

  constructor(token: Token, identifier: Identifier, expression: Expression) {
    this.token = token;
    this.identifier = identifier;
    this.expression = expression;
  }

  public tokenliteral(): string | null {
    return this.token.literal;
  }

  public stringify(): string {
    return `${this.tokenliteral()} ${this.identifier}, ${this.expression.stringify()}`;
  }
}

export class Identifier implements Statement {
  private token: Token;
  private value: string;

  constructor(token: Token, value: string) {
    this.token = token;
    this.value = value;
  }

  public tokenliteral(): string | null {
    return this.token.literal;
  }

  public stringify(): string {
    return this.value;
  }
}
