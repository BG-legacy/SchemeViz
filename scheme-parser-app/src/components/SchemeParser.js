import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Parser } from '../parser/parser.js';
import { evaluate, standardEnv } from '../parser/evaluator.js';
import ASTTreeView from './ASTTreeView.js';

/**
 * SchemeParser Component
 * Main component for parsing and evaluating Scheme expressions
 * Displays the AST and evaluation results
 */
const SchemeParser = () => {
  // State management for input, AST, errors, and results
  const [input, setInput] = useState('');
  const [ast, setAst] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  /**
   * Handles parsing and evaluation of the input Scheme expression
   * Updates state with AST and evaluation results or error messages
   */
  const handleParse = () => {
    try {
      setError(null);
      // Create parser instance and parse input
      const parser = new Parser(input);
      const parsedAst = parser.parse();
      setAst(parsedAst);
      
      // Try to evaluate the parsed AST
      try {
        const evaluationResult = evaluate(parsedAst, standardEnv);
        setResult(evaluationResult);
      } catch (e) {
        setResult(`Evaluation Error: ${e.message}`);
      }
    } catch (e) {
      setError(e.message);
      setAst(null);
      setResult(null);
    }
  };

  return (
    // Main container with background color and padding
    <div className="min-h-screen bg-[#2C1810] p-8">
      {/* Animated container for all content */}
      <motion.div 
        className="max-w-6xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Input section */}
        <div className="space-y-4">
          {/* Title */}
          <motion.h2 
            className="text-3xl font-bold text-[#E8D5B5]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Scheme Parser & Evaluator
          </motion.h2>
          
          {/* Input form */}
          <div className="space-y-4">
            <label htmlFor="scheme-input" className="block text-lg font-medium text-[#D4B996]">
              Enter Scheme Expression
            </label>
            {/* Textarea for Scheme input */}
            <motion.textarea
              id="scheme-input"
              className="w-full h-32 p-4 rounded-lg bg-[#3A2318] text-[#E8D5B5] border border-[#8B4513] focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D] focus:outline-none transition-all duration-300 font-mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., (+ (* 2 4) 3) or (cons 1 (list 2 3))"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            />
            {/* Parse button */}
            <motion.button
              onClick={handleParse}
              className="px-6 py-3 bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold rounded-lg text-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Parse & Evaluate
            </motion.button>
          </div>
        </div>

        {/* Error display */}
        {error && (
          <motion.div 
            className="p-4 bg-[#3A2318] text-red-300 rounded-lg border border-red-500"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <strong className="text-red-400">Error:</strong> {error}
          </motion.div>
        )}

        {/* Results display */}
        {ast && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {/* AST visualization */}
            <div className="bg-[#3A2318] p-6 rounded-lg border border-[#8B4513]">
              <h3 className="text-xl font-semibold text-[#D4B996] mb-4">Abstract Syntax Tree</h3>
              <div className="min-h-[400px] rounded-lg overflow-hidden">
                <ASTTreeView ast={ast} />
              </div>
            </div>

            {/* Evaluation result */}
            <div className="bg-[#3A2318] p-6 rounded-lg border border-[#8B4513]">
              <h3 className="text-xl font-semibold text-[#D4B996] mb-4">Evaluation Result</h3>
              <pre className="p-4 bg-[#2C1810] rounded-lg text-[#E8D5B5] overflow-auto font-mono">
                {typeof result === 'object' 
                  ? JSON.stringify(result, null, 2)
                  : String(result)}
              </pre>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SchemeParser; 