import { TokenType } from "./TokenType"

export type Token = {
  tokenType: TokenType,
  literal: string | null
}
