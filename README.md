# 🚀 SchemeViz: Interactive Scheme Parser & Visualizer

Welcome to **SchemeViz**, a powerful and interactive tool that brings Scheme-like language parsing to life! Built with modern React and featuring stunning visualizations, this tool transforms complex code into beautiful, interactive representations.

## ✨ Key Features

### 🎯 Real-time Code Analysis
- **Instant Parsing**: Watch your Scheme code transform into an Abstract Syntax Tree (AST) in real-time
- **Live Evaluation**: See your code execute and get immediate results
- **Error Detection**: Get instant feedback on syntax errors and invalid expressions

### 🎨 Multiple Visualization Modes
- **Tree View**: Classic binary tree representation with ASCII art
- **Flow Graph**: Interactive node-based visualization using ReactFlow
- **Visual Tree**: Animated tree visualization with smooth transitions
- **ASCII Tree**: Clean, text-based tree representation

### 🎮 Interactive Experience
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Responsive Design**: Works beautifully on all screen sizes
- **Modern UI**: Clean, intuitive interface with a professional color scheme

## 🛠️ Technical Stack

- **Frontend**: React.js with modern hooks
- **Styling**: Tailwind CSS for responsive design
- **Animations**: Framer Motion for smooth transitions
- **Visualization**: ReactFlow for interactive graphs
- **Build Tools**: Create React App with optimized configuration

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/scheme-parser-app.git
   cd scheme-parser-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser** to `http://localhost:3000`

## 💡 Example Usage

Try these sample expressions to see SchemeViz in action:

```scheme
;; Basic arithmetic
(+ (* 2 4) 3)  ; Returns 11

;; List operations
(cons 1 (list 2 3))  ; Returns (1 2 3)

;; Function definition
(define (factorial n)
  (if (= n 0)
      1
      (* n (factorial (- n 1)))))
```

## 🎯 Project Goals

- Provide an intuitive way to understand Scheme-like language parsing
- Demonstrate different visualization techniques for ASTs
- Create an engaging learning tool for programming language theory
- Showcase modern web development practices

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Bernard Ginn
- Destiny Butler

## 🙏 Acknowledgments

- Theory of Computation course at CSU
- React and Framer Motion communities
- All contributors and users of this project 