export class TokenizerError {

  message: string;
  line: number;
  column: number;

  constructor (message: string, line: number, column: number) {
    this.message = message;
    this.line = line;
    this.column = column;
  }
  
  public getErrorMessage(): string {
    return `Error at line ${this.line} column ${this.column}: ${this.message}`;
  }
}
