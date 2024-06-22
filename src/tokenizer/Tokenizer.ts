import { Token } from "../token/Token";
import { TokenType } from "../token/TokenType";
import { TokenizerError } from "./TokenizerError";

export class Tokenizer {
  
  private input: string;
  private currentPosition: number;
  private peekPosition: number;
  private ch: string | null;
  private columnPointer: number;
  private linePointer: number;
  private errors: Array<TokenizerError>;

  constructor(input: string){
    this.input = input;
    this.peekPosition = 0;
    this.currentPosition = 0;
    this.ch = null;
    this.columnPointer = 1;
    this.linePointer = 0;
    this.errors = [];

    this.readChar();
  }

  public nextToken(): Token {
    console.log(`Start tokenizing character: ${this.ch}, line: ${this.peekPosition}, column: ${this.columnPointer}.`);
    let token: Token;
    let error: TokenizerError | null = null;

    this.skipWhiteSpace();

    switch (this.ch) {
      case '=':
        token = new Token(TokenType.ASSIGN, this.ch, this.getLineNumber(), this.columnPointer);
        break;

      case '+':
        token = new Token(TokenType.PLUS, this.ch, this.getLineNumber(), this.columnPointer);
        break;

      case '-':
        token = new Token(TokenType.MINUS, this.ch, this.getLineNumber(), this.columnPointer);
        break;

      case '*':
        token = new Token(TokenType.ASTERISK, this.ch, this.getLineNumber(), this.columnPointer);
        break;

      case '/':
        token = new Token(TokenType.SLASH, this.ch, this.getLineNumber(), this.columnPointer);
        break;

      case ',':
        token = new Token(TokenType.COMMA, this.ch, this.getLineNumber(), this.columnPointer);
        break;

      case ';':
        token = new Token(TokenType.SEMICOLON, this.ch, this.getLineNumber(), this.columnPointer);
        break;

      case '(':
        token = new Token(TokenType.LPAREN, this.ch, this.getLineNumber(), this.columnPointer);
        break;

      case ')':
        token = new Token(TokenType.RPAREN, this.ch, this.getLineNumber(), this.columnPointer);
        break;

      case '{':
        token = new Token(TokenType.LBRACE, this.ch, this.getLineNumber(), this.columnPointer);
        break;

      case '}':
        token = new Token(TokenType.RBRACE, this.ch, this.getLineNumber(), this.columnPointer);
        break;

      case "":
        token = new Token(TokenType.EOF, null, this.getLineNumber(), this.columnPointer);
        break;
      
      case null:
        token = new Token(TokenType.EOF, null, this.getLineNumber(), this.columnPointer);
        break;

      default:
        error = new TokenizerError(`Illegal character: ${this.ch}`, this.getLineNumber(), this.columnPointer);
        token = new Token(TokenType.ILLEGAL, this.ch, this.getLineNumber(), this.columnPointer);
        this.errors.push(error);
        break;
    }
    
    if (error) {
      console.error(`${error.getErrorMessage()}`);
    }
    
    console.log(`End tokenizing character: ${this.ch}. Token: ${token.stringify()}`);
    this.readChar();
    return token;
  }

  private readChar(): void {
    if (this.peekPosition > this.input.length) {
      this.ch = null;
    } else {
      this.ch = this.input.charAt(this.peekPosition);
    }

    this.currentPosition = this.peekPosition;
    this.linePointer++;
    this.peekPosition++;
  }

  private skipWhiteSpace(): void {
    if (this.ch === '\n') {
      this.columnPointer++;
      this.resetLinePointer();
      this.readChar();
    }

    if (this.ch === ' ') {
      this.readChar();
    }
  }

  public getErrors(): Array<TokenizerError> {
    return this.errors;
  }

  private getLineNumber(): number {
    return this.linePointer;
  }
  
  private resetLinePointer(): void {
    this.linePointer = 0;
  }
}
