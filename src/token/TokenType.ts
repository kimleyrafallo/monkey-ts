export enum TokenType {
  ILLEGAL = 'ILLEGAL',
  EOF = 'EOF',
  
  IDENTIFIER = 'IDENTIFIER',
  INT = 'INT',

  FUNCTION = 'FUNCTION',
  LET = 'LET',

  ASSIGN = 'ASSIGN',
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  SLASH = 'SLASH',
  ASTERISK = 'ASTERISK',
  BANG = 'BANG',
  LT = 'LT',
  GT = 'GT',
  EQ = 'EQ',
  NOTEQ = 'NOTEQ',

  COMMA = 'COMMA',
  SEMICOLON = 'SEMICOLON',

  LPAREN = 'LPAREN',
  RPAREN = 'RPAREN',
  LBRACE = 'LBRACE',
  RBRACE = 'RBRACE',

  TRUE = 'TRUE',
  FALSE = 'FALSE',
  RETURN = 'RETURN',
  IF = 'IF',
  ELSE = 'ELSE'
}
