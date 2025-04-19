import React from 'react';
import { motion } from 'framer-motion';

/**
 * ASCIITreeView Component
 * Renders the AST using ASCII art characters for a tree-like visualization
 * @param {Object} props - Component props
 * @param {Object} props.ast - The root AST node
 */
const ASCIITreeView = ({ ast }) => {
  if (!ast) return null;

  /**
   * Extracts the value to display for a node
   * @param {Object} node - The AST node
   * @returns {string} - The node's display value
   */
  const getNodeValue = (node) => {
    if (node.type === 'List') {
      return node.value[0].value;
    }
    return node.value;
  };

  /**
   * Gets the children of a node
   * @param {Object} node - The AST node
   * @returns {Array} - Array of child nodes
   */
  const getChildren = (node) => {
    if (node.type === 'List') {
      return node.value.slice(1);
    }
    return [];
  };

  /**
   * Recursively builds the ASCII tree representation
   * @param {Object} node - Current node to process
   * @param {number} level - Current depth level
   * @param {string} prefix - Prefix for the current line
   * @returns {Array} - Array of strings representing the tree
   */
  const buildTreeLines = (node, level = 0, prefix = '') => {
    if (!node) return [];

    const nodeValue = getNodeValue(node);
    const children = getChildren(node);
    const lines = [];

    // Add the current node with proper spacing and styling
    const nodeLine = ' '.repeat(4 * level) + '┌─ ' + nodeValue;
    lines.push(nodeLine);

    if (children.length > 0) {
      // Add vertical connecting line
      const connectorLine = ' '.repeat(4 * level) + '│';
      lines.push(connectorLine);

      // Process each child node
      children.forEach((child, index) => {
        const isLastChild = index === children.length - 1;
        const childPrefix = isLastChild ? '└─ ' : '├─ ';
        const childLines = buildTreeLines(child, level + 1, childPrefix);
        
        // Add child lines with proper indentation and connectors
        childLines.forEach((line, lineIndex) => {
          if (lineIndex === 0) {
            // First line of child gets the prefix
            lines.push(' '.repeat(4 * level) + childPrefix + line.substring(4 * level + 3));
          } else {
            // Other lines get proper indentation
            lines.push(' '.repeat(4 * level) + '│  ' + line.substring(4 * level + 3));
          }
        });
      });
    }

    return lines;
  };

  // Generate the ASCII tree representation
  const treeLines = buildTreeLines(ast);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Pre-formatted text block for the ASCII tree */}
      <pre className="font-mono text-[#E8D5B5] whitespace-pre overflow-x-auto p-4 rounded-lg">
        {treeLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="text-[#D4B996]"
          >
            {line}
          </motion.div>
        ))}
      </pre>
    </motion.div>
  );
};

export default ASCIITreeView; 