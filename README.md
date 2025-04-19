# SchemeViz

An interactive Scheme-like language lexer/parser visualization tool built with React. This tool allows you to:

- Input Scheme-like code and see it tokenized in real-time
- View the generated Abstract Syntax Tree (AST)
- Understand the parsing process through visual feedback

## Features

- Real-time lexical analysis (tokenization)
- Interactive parsing with AST visualization
- Live code editing with immediate feedback
- Syntax highlighting
- Error detection and reporting

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser to `http://localhost:3000`

## Usage

1. Type or paste Scheme-like code into the input area
2. Watch as the code is tokenized and parsed in real-time
3. View the generated AST visualization
4. See any syntax errors highlighted in the input

## Example Input

```scheme
(define (factorial n)
  (if (= n 0)
      1
      (* n (factorial (- n 1)))))
```