import React from 'react';
import { motion } from 'framer-motion';

/**
 * TreeNode Component
 * Recursive component that renders a single node in the AST
 * @param {Object} props - Component props
 * @param {Object} props.node - The AST node to render
 * @param {number} props.level - The depth level in the tree
 */
const TreeNode = ({ node, level = 0 }) => {
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

  const nodeValue = getNodeValue(node);
  const children = getChildren(node);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: level * 0.1 }}
      className="relative"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0'
      }}
    >
      {/* Node Circle - displays the node's value */}
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-white border border-black flex items-center justify-center">
          <span className="text-black text-sm font-medium">{nodeValue}</span>
        </div>
      </div>

      {/* Children container - renders child nodes recursively */}
      {children.length > 0 && (
        <div 
          className="relative"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginTop: '20px'
          }}
        >
          {children.map((child, index) => (
            <div key={index} className="relative">
              {/* Diagonal Line - connects parent to child nodes */}
              <div
                className="absolute bg-black"
                style={{
                  width: '2px',
                  height: '30px',
                  top: '-20px',
                  left: '50%',
                  transform: `translateX(-50%) rotate(${index === 0 ? '30deg' : '-30deg'})`,
                  transformOrigin: 'top',
                }}
              />
              <TreeNode node={child} level={level + 1} />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

/**
 * ASTVisualizer Component
 * Main component that renders the entire AST visualization
 * @param {Object} props - Component props
 * @param {Object} props.ast - The root AST node
 */
const ASTVisualizer = ({ ast }) => {
  if (!ast) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-auto p-8 bg-white rounded-lg"
      style={{ minHeight: '300px' }}
    >
      <div className="flex justify-center">
        <TreeNode node={ast} />
      </div>
    </motion.div>
  );
};

export default ASTVisualizer; 