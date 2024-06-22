import { Token } from "../token/Token";
import { TokenType } from "../token/TokenType";

export class Tokenizer {
  
  private input: string;
  private currentPosition: number;
  private peekPosition: number;
  private ch: string | null;
  
  constructor(input: string){
    this.input = input;
    this.peekPosition = 0;
    this.currentPosition = 0;
    this.ch = null;

    this.readChar();
  }

  public nextToken(): Token {
    console.log(`Start tokenizing character: ${this.ch}, line: ${this.peekPosition}.`);
    let token: Token;

    switch (this.ch) {
      case '=':
        token = new Token(TokenType.ASSIGN, this.ch);
        break;

      case '+':
        token = new Token(TokenType.PLUS, this.ch);
        break;

      case '-':
        token = new Token(TokenType.MINUS, this.ch);
        break;

      case '*':
        token = new Token(TokenType.ASTERISK, this.ch);
        break;

      case '/':
        token = new Token(TokenType.SLASH, this.ch);
        break;

      case ',':
        token = new Token(TokenType.COMMA, this.ch);
        break;

      case ';':
        token = new Token(TokenType.SEMICOLON, this.ch);
        break;

      case '(':
        token = new Token(TokenType.LPAREN, this.ch);
        break;

      case ')':
        token = new Token(TokenType.RPAREN, this.ch);
        break;

      case '{':
        token = new Token(TokenType.LBRACE, this.ch);
        break;

      case '}':
        token = new Token(TokenType.RBRACE, this.ch);
        break;

      default:
        token = new Token(TokenType.EOF, null);
        break;
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
    this.peekPosition++;
  }

}
