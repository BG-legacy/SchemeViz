import { Lexer, TokenType } from './lexer.js';

class ParserError extends Error {
  constructor(message, token) {
    super(message);
    this.token = token;
    this.name = 'ParserError';
  }
}

class Parser {
  constructor(input) {
    this.lexer = new Lexer(input);
    this.currentToken = null;
    this.nextToken();
  }

  nextToken() {
    this.currentToken = this.lexer.nextToken();
    return this.currentToken;
  }

  expect(type) {
    if (this.currentToken.type === type) {
      const token = this.currentToken;
      this.nextToken();
      return token;
    }
    throw new Error(`Expected ${type}, got ${this.currentToken.type}`);
  }

  parse() {
    if (this.currentToken.type === TokenType.EOF) {
      return null; // Return null for empty input
    }
    return this.parseExpression();
  }

  parseExpression() {
    if (this.currentToken.type === TokenType.LPAREN) {
      return this.parseList();
    } else if (this.currentToken.type === TokenType.QUOTE) {
      return this.parseQuote();
    } else if (this.currentToken.type === TokenType.EOF) {
      throw new ParserError('Unexpected end of input', this.currentToken);
    } else {
      return this.parseAtom();
    }
  }

  parseList() {
    this.expect(TokenType.LPAREN);
    const elements = [];
    
    while (this.currentToken.type !== TokenType.RPAREN) {
      if (this.currentToken.type === TokenType.EOF) {
        throw new ParserError('Unclosed parenthesis', this.currentToken);
      }
      elements.push(this.parseExpression());
    }
    
    this.expect(TokenType.RPAREN);
    return {
      type: 'List',
      value: elements
    };
  }

  parseQuote() {
    this.expect(TokenType.QUOTE);
    return {
      type: 'Quote',
      value: this.parseExpression()
    };
  }

  parseAtom() {
    const token = this.currentToken;
    this.nextToken();

    switch (token.type) {
      case TokenType.NUMBER:
        return { type: 'Number', value: token.value };
      case TokenType.STRING:
        return { type: 'String', value: token.value };
      case TokenType.BOOLEAN:
        return { type: 'Boolean', value: token.value };
      case TokenType.SYMBOL:
        return { type: 'Symbol', value: token.value };
      case TokenType.LPAREN:
        return this.parseList();
      default:
        throw new ParserError(
          `Unexpected token type: ${token.type}`,
          token
        );
    }
  }
}

export { Parser, ParserError }; 