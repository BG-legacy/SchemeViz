import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/**
 * LandingPage Component
 * Displays the welcome page with animated content and navigation to the parser
 */
const LandingPage = () => {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        staggerChildren: 0.3 // Stagger child animations
      }
    }
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    // Main container with background color and flex layout
    <div className="min-h-screen bg-[#2C1810] text-[#E8D5B5] flex flex-col items-center justify-center p-8">
      {/* Animated container for all content */}
      <motion.div
        className="max-w-4xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated title */}
        <motion.h1 
          className="text-6xl font-bold mb-6"
          variants={itemVariants}
        >
          Bernard Ginn & Destiny Butler
        </motion.h1>
        
        {/* Animated subtitle */}
        <motion.h2 
          className="text-4xl font-semibold mb-8"
          variants={itemVariants}
        >
          Project 3: SchemeViz
        </motion.h2>
        
        {/* Animated description */}
        <motion.p 
          className="text-xl mb-12 text-[#D4B996]"
          variants={itemVariants}
        >
          Theory of Computation
        </motion.p>

        {/* Animated button container */}
        <motion.div variants={itemVariants}>
          {/* Interactive button with hover and tap animations */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300"
            onClick={() => navigate('/parser')}
          >
            Enter Scheme Parser & Evaluator
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage; 