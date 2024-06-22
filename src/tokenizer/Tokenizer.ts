import { Keyword, getKeywordTokenType } from "../token/Keyword";
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

    this.skipWhitespace();

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

      case '>':
        token = new Token(TokenType.GT, this.ch, this.getLineNumber(), this.columnPointer);
        break;

      case '<':
        token = new Token(TokenType.LT, this.ch, this.getLineNumber(), this.columnPointer);
        break;

      case "":
        token = new Token(TokenType.EOF, null, this.getLineNumber(), this.columnPointer);
        break;
      
      case null:
        token = new Token(TokenType.EOF, null, this.getLineNumber(), this.columnPointer);
        break;

      default:
        if (this.isLetter(this.ch)) {
          const word = this.readWord();
          const tokenType = this.getTokenTypeOfIdentifier(word);
          return new Token(tokenType, word, this.getLineNumber() - word.length, this.columnPointer);
        } else if (this.isDigit(this.ch)) {
          const number = this.readNumber();
          return new Token(TokenType.INT, number, this.getLineNumber() - number.length, this.columnPointer);
        } else {
          error = new TokenizerError(`Illegal character: ${this.ch}`, this.getLineNumber(), this.columnPointer);
          token = new Token(TokenType.ILLEGAL, this.ch, this.getLineNumber(), this.columnPointer);
          this.errors.push(error);
        }

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
  
  private readWord(): string {
    let word = '';

    while (this.isLetter(this.ch)) {
      word += this.ch;
      this.readChar();
    }

    return word;
  }

  private isLetter(ch: string | null): boolean {
    if (!ch) {
      return false;
    }

    const charCode: number = ch.charCodeAt(0);
    return ('a'.charCodeAt(0) <= charCode && charCode <= 'z'.charCodeAt(0))
      || ('A'.charCodeAt(0) <= charCode && charCode <= 'Z'.charCodeAt(0))
      || ('_'.charCodeAt(0) === charCode);
  }

  private isKeyword(word: string): boolean {
    return Object.values(Keyword).includes(<any>word);
  }

  private getTokenTypeOfIdentifier(word: string): TokenType {
    if (this.isKeyword(word)) {
      return getKeywordTokenType(word);
    }

    return TokenType.IDENTIFIER;
  }
  
  private readNumber(): string {
    const startPosition = this.currentPosition;

    while (this.isDigit(this.ch)) {
      this.readChar();
    }

    return this.input.substring(startPosition, this.currentPosition);
  }

  private isDigit(ch: string | null): boolean {
    if (!ch) {
      return false;
    }
    
    const code_ch = ch.charCodeAt(0);
    const code_0 = '0'.codePointAt(0);
    const code_9 = '9'.codePointAt(0);
    
    if (code_0 == undefined) {
      console.warn(`UTF-16 code for ${code_0} is undefined.`);
      return false;
    }

    if (code_9 == undefined) {
      console.warn(`UTF-16 code for ${code_9} is undefined.`);
      return false;
    }

    return code_0 <= code_ch && code_ch <= code_9;
  }

  private isWhitespace(ch: string | null): boolean {
    return ch == ' ' || ch == '\t';
  }

  private isNextLine(ch: string | null): boolean {
    return ch == '\n' || ch == '\r';
  }

  private skipWhitespace(): void {
    let isNextLine = this.isNextLine(this.ch);
    let isWhitespace = this.isWhitespace(this.ch);

    while (isNextLine || isWhitespace) {
      if (isNextLine){
        this.columnPointer++;
        this.resetLinePointer();
      }
      
      this.readChar();
      isWhitespace = this.isWhitespace(this.ch);
      isNextLine = this.isNextLine(this.ch);
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
