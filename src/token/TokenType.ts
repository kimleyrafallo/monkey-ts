export enum TokenType {
  ILLEGAL,
  EOF,
  
  IDENTIFIER,
  INT,

  FUNCTION,
  LET,

  ASSIGN,
  PLUS,
  MINUS,
  SLASH,
  ASTERISK,
  BANG,
  LT,
  GT,
  EQ,
  NOTEQ,

  COMMA,
  SEMICOLON,

  LPAREN,
  RPAREN,
  LBRACE,
  RBRACE,

  TRUE,
  FALSE,
  RETURN,
  IF,
  ELSE
}
