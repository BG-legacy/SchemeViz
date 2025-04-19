import React from 'react';

/**
 * ASTTreeView Component
 * Visualizes the Abstract Syntax Tree (AST) of a Scheme expression
 * Displays the tree in a text-based format with ASCII art
 */
const ASTTreeView = ({ ast }) => {
  // Return null if no AST is provided
  if (!ast) return null;

  /**
   * Extracts the value from a node based on its type
   * @param {Object} node - The AST node
   * @returns {string|number|null} - The node's value
   */
  const getNodeValue = (node) => {
    if (!node) return null;
    
    if (node.type === 'Symbol') {
      return node.value;
    }
    else if (node.type === 'Number') {
      return node.value;
    }
    else {
      return node.value;
    }
  };

  /**
   * Formats a binary tree structure for list nodes
   * Creates ASCII art representation of the tree
   * @param {Object} node - The AST node to format
   * @returns {Array} - Array of strings representing the tree levels
   */
  const formatBinaryTree = (node) => {
    if (!node) return [];
    
    if (node.type === 'List') {
      const elements = node.value;
      if (elements.length === 0) return [];
      
      // Get the operator (first element)
      const operator = elements[0];
      const operands = elements.slice(1);
      
      // Get the value of the operator
      const opValue = getNodeValue(operator);
      
      // Handle binary operations with 2 operands
      if (operands.length === 2) {
        // Special case for nested expressions like (+ (* 2 4) 3)
        if (operands[0].type === 'List' && operands[0].value.length >= 2 && 
            (operands[1].type === 'Number' || operands[1].type === 'Symbol')) {
          
          const nestedOp = operands[0].value[0];
          const nestedOpValue = getNodeValue(nestedOp);
          const nestedOperands = operands[0].value.slice(1);
          
          // Format nested binary operation
          if (nestedOperands.length >= 2) {
            const secondValue = getNodeValue(operands[1]);
            const nestedLeft = getNodeValue(nestedOperands[0]);
            const nestedRight = getNodeValue(nestedOperands[1]);
            
            return [
              opValue,              // +
              '/ \\',               // / \
              `${nestedOpValue}   ${secondValue}`, // *   3
              '/ \\',               // / \
              `${nestedLeft}   ${nestedRight}`      // 2   4
            ];
          }
        }
        
        // Handle regular binary operations
        const leftValue = getNodeValue(operands[0]);
        const rightValue = getNodeValue(operands[1]);
        
        return [
          opValue,
          '/ \\',
          `${leftValue}   ${rightValue}`
        ];
      }
      
      // Handle unary operations
      if (operands.length === 1) {
        return [
          opValue,
          '|',
          getNodeValue(operands[0])
        ];
      }
      
      // Handle operations with 3+ operands
      if (operands.length >= 3) {
        const opLine = `  ${opValue}  `;
        let branchLine = '/';
        for (let i = 1; i < operands.length-1; i++) {
          branchLine += ' | ';
        }
        branchLine += ' \\';
        
        let valuesLine = getNodeValue(operands[0]);
        for (let i = 1; i < operands.length; i++) {
          valuesLine += '   ' + getNodeValue(operands[i]);
        }
        
        return [opLine, branchLine, valuesLine];
      }
    }
    
    // Default case for non-lists or empty lists
    return [getNodeValue(node)];
  };

  // Generate the tree representation
  const treeLines = formatBinaryTree(ast);

  return (
    // Container for the tree visualization
    <div className="overflow-auto p-8 flex justify-center">
      {/* Pre-formatted text block for the tree */}
      <pre className="text-xl font-mono bg-white p-8 rounded text-left whitespace-pre">
        {treeLines.join('\n')}
      </pre>
    </div>
  );
};

export default ASTTreeView; 