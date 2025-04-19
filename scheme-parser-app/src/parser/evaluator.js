class EvaluationError extends Error {
  constructor(message, node) {
    super(message);
    this.node = node;
    this.name = 'EvaluationError';
  }
}

class Environment {
  constructor(parent = null) {
    this.parent = parent;
    this.bindings = new Map();
  }

  define(name, value) {
    this.bindings.set(name, value);
  }

  lookup(name) {
    if (this.bindings.has(name)) {
      return this.bindings.get(name);
    }
    if (this.parent) {
      return this.parent.lookup(name);
    }
    throw new EvaluationError(`Undefined variable: ${name}`);
  }
}

// Standard environment with basic Scheme functions
const standardEnv = {
  '+': (...args) => args.reduce((a, b) => a + b, 0),
  '-': (...args) => args.reduce((a, b) => a - b),
  '*': (...args) => args.reduce((a, b) => a * b, 1),
  '/': (...args) => args.reduce((a, b) => a / b),
  '=': (a, b) => a === b,
  '<': (a, b) => a < b,
  '>': (a, b) => a > b,
  'cons': (a, b) => [a, ...(Array.isArray(b) ? b : [b])],
  'car': (list) => list[0],
  'cdr': (list) => list.slice(1),
  'list': (...args) => args,
  'null?': (x) => Array.isArray(x) && x.length === 0,
  'number?': (x) => typeof x === 'number',
  'symbol?': (x) => typeof x === 'string' && !['number', 'boolean', 'string'].includes(x),
  'boolean?': (x) => typeof x === 'boolean',
  'string?': (x) => typeof x === 'string',
  'not': (x) => !x,
  'and': (...args) => args.every(x => x),
  'or': (...args) => args.some(x => x)
};

function evaluate(ast, env = standardEnv) {
  if (!ast) return null;

  switch (ast.type) {
    case 'Number':
    case 'String':
    case 'Boolean':
      return ast.value;

    case 'Symbol':
      if (env[ast.value] === undefined) {
        throw new Error(`Undefined symbol: ${ast.value}`);
      }
      return env[ast.value];

    case 'List':
      if (ast.value.length === 0) {
        return [];
      }
      
      const [first, ...rest] = ast.value;
      const evaluatedFirst = evaluate(first, env);
      
      if (typeof evaluatedFirst === 'function') {
        const evaluatedArgs = rest.map(arg => evaluate(arg, env));
        return evaluatedFirst(...evaluatedArgs);
      }
      
      return [evaluatedFirst, ...rest.map(arg => evaluate(arg, env))];

    case 'Quote':
      return ast.value;

    default:
      throw new Error(`Unknown AST type: ${ast.type}`);
  }
}

export { evaluate, standardEnv }; 