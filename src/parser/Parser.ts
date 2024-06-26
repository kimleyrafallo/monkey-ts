import { Token } from "../token/Token";
import { TokenType } from "../token/TokenType";
import { Tokenizer } from "../tokenizer/Tokenizer";
import { Error } from "../tokenizer/TokenizerError";
import { Expression, Identifier, LetStatement, Program, Statement } from "./Ast";

export class Parser {
  private tokenizer: Tokenizer;

  // @ts-ignore
  // Ignoring for cleaner code and preventing adding 
  // unnecessary checking for currentToken
  // as currentToken is initialized when 
  // advanceToken() was called in the constructor
  private currentToken: Token;

  // @ts-ignore
  // Ignoring for cleaner code and preventing adding 
  // unnecessary checking for peekToken
  // as peekToken is initialized when 
  // advanceToken() was called in the constructor
  private peekToken: Token;
  private errors: Array<Error> = [];

  constructor(tokenizer: Tokenizer){
    this.tokenizer = tokenizer;
    this.advanceToken();
    this.advanceToken();
  }

  public parse(): Array<Statement> {
    let program = new Program();
    
    if (!this.currentToken) {
      throw 'Current token is null.';
    }

    while(!this.isCurrentToken(TokenType.EOF)){
      const statement = this.parseToken();
    
      if (statement != null) {
        program.addStatement(statement);
      }

      console.warn('Statement is null.');

      this.advanceToken();
    }

    return program.getStatement();
  }

  private parseToken(): Statement | null {
    switch (this.currentToken.tokenType) {
      case TokenType.LET:
        return this.parseLetStatement();

      default:
        let message = `Invalid token: ${this.currentToken.stringify()}`;
        this.addError(new Error(message, this.currentToken.column, this.currentToken.line));
        throw message;
    };
  }
  
  private parseIdentifier() {
    return new Identifier(this.currentToken, `${this.currentToken.literal}`);
  }

  private parseLetStatement() {
    console.info('Start parsing Let Statement');
    this.advanceToken(); // Advance token to get Identifier

    if (!this.isCurrentToken(TokenType.IDENTIFIER)) {
      return null;
    }

    // TODO: Handler for when expression is passed instead of identifier
    // Currently, LetStatement() can only handle identifiers

    console.info('End parsing Let Statement');
    return new LetStatement(this.currentToken, this.parseIdentifier(), new Expression());
  }
  
  private advanceToken(): void {
    this.currentToken = this.peekToken;
    this.peekToken = this.tokenizer.nextToken();
  }

  private isCurrentToken(tokenType: TokenType): boolean {
    return this.currentToken.tokenType == tokenType;
  }

  private addError(error: Error) {
    this.errors.push(error);
  }

  public getErrors(): Array<Error> {
    return this.errors;
  }
}
