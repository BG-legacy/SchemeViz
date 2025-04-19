// Token types for our Scheme-like language
const TokenType = {
  LPAREN: 'LPAREN',
  RPAREN: 'RPAREN',
  QUOTE: 'QUOTE',
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  BOOLEAN: 'BOOLEAN',
  SYMBOL: 'SYMBOL',
  EOF: 'EOF'
};

class Token {
  constructor(type, value, line, column) {
    this.type = type;
    this.value = value;
    this.line = line;
    this.column = column;
  }

  toString() {
    return `Token(${this.type}, ${this.value}, ${this.line}:${this.column})`;
  }
}

class Lexer {
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.line = 1;
    this.column = 1;
  }

  // Get the current character
  current() {
    return this.input[this.position];
  }

  // Move to the next character
  advance() {
    if (this.current() === '\n') {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }
    this.position++;
  }

  // Skip whitespace and comments
  skipWhitespace() {
    while (this.position < this.input.length) {
      const c = this.current();
      if (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
        this.advance();
      } else if (c === ';') {
        // Skip comments
        while (this.position < this.input.length && this.current() !== '\n') {
          this.advance();
        }
      } else {
        break;
      }
    }
  }

  // Read a number
  readNumber() {
    let value = '';
    while (this.position < this.input.length && /[0-9.]/.test(this.current())) {
      value += this.current();
      this.advance();
    }
    return new Token(TokenType.NUMBER, parseFloat(value), this.line, this.column);
  }

  // Read a string
  readString() {
    let value = '';
    this.advance(); // Skip opening quote
    while (this.position < this.input.length && this.current() !== '"') {
      value += this.current();
      this.advance();
    }
    this.advance(); // Skip closing quote
    return new Token(TokenType.STRING, value, this.line, this.column);
  }

  // Read a symbol
  readSymbol() {
    let value = '';
    while (this.position < this.input.length && /[^()\s]/.test(this.current())) {
      value += this.current();
      this.advance();
    }
    
    // Check for boolean literals
    if (value === '#t' || value === '#f') {
      return new Token(TokenType.BOOLEAN, value === '#t', this.line, this.column);
    }
    
    return new Token(TokenType.SYMBOL, value, this.line, this.column);
  }

  // Get the next token
  nextToken() {
    this.skipWhitespace();

    if (this.position >= this.input.length) {
      return new Token(TokenType.EOF, null, this.line, this.column);
    }

    const c = this.current();

    switch (c) {
      case '(':
        this.advance();
        return new Token(TokenType.LPAREN, '(', this.line, this.column);
      case ')':
        this.advance();
        return new Token(TokenType.RPAREN, ')', this.line, this.column);
      case "'":
        this.advance();
        return new Token(TokenType.QUOTE, "'", this.line, this.column);
      case '"':
        return this.readString();
      default:
        if (/[0-9]/.test(c)) {
          return this.readNumber();
        } else {
          return this.readSymbol();
        }
    }
  }

  tokenize() {
    const tokens = [];
    let token = this.nextToken();
    while (token.type !== TokenType.EOF) {
      tokens.push(token);
      token = this.nextToken();
    }
    tokens.push(token); // Add EOF token
    return tokens;
  }
}

export { Lexer, Token, TokenType }; 