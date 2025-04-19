import React, { useCallback } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

/**
 * ASTFlowGraph Component
 * Visualizes the AST using a flow graph with ReactFlow
 * @param {Object} props - Component props
 * @param {Object} props.ast - The root AST node
 */
const ASTFlowGraph = ({ ast }) => {
  // State management for nodes and edges in the flow graph
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  /**
   * Transforms the AST into a format suitable for ReactFlow
   * @param {Object} node - Current AST node to process
   * @param {string} parentId - ID of the parent node
   * @param {number} level - Current depth level
   * @param {number} index - Index of the current node among siblings
   * @returns {Object} - Object containing nodes and edges for the flow graph
   */
  const transformASTToFlow = useCallback((node, parentId = null, level = 0, index = 0) => {
    if (!node) return { nodes: [], edges: [] };

    // Generate unique node ID and position
    const nodeId = `${node.type}-${level}-${index}`;
    const position = { x: level * 200, y: index * 100 };
    
    // Create the current node
    const currentNode = {
      id: nodeId,
      type: 'default',
      position,
      data: { 
        label: `${node.type}: ${typeof node.value === 'object' ? '' : JSON.stringify(node.value)}`,
      },
      style: {
        background: getNodeColor(node.type),
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
      },
    };

    const nodes = [currentNode];
    const edges = [];

    // Add edge from parent to current node if parent exists
    if (parentId) {
      edges.push({
        id: `e-${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
      });
    }

    // Process children for List and Quote nodes
    if (node.type === 'List' || node.type === 'Quote') {
      const children = Array.isArray(node.value) ? node.value : [node.value];
      children.forEach((child, i) => {
        const childResult = transformASTToFlow(child, nodeId, level + 1, i);
        nodes.push(...childResult.nodes);
        edges.push(...childResult.edges);
      });
    }

    return { nodes, edges };
  }, []);

  /**
   * Returns a color based on the node type
   * @param {string} type - The type of the AST node
   * @returns {string} - Color code for the node
   */
  const getNodeColor = (type) => {
    switch (type) {
      case 'List':
        return '#3B82F6'; // blue-500
      case 'Quote':
        return '#8B5CF6'; // purple-500
      case 'Number':
        return '#10B981'; // green-500
      case 'String':
        return '#EF4444'; // red-500
      case 'Boolean':
        return '#F59E0B'; // yellow-500
      case 'Symbol':
        return '#6366F1'; // indigo-500
      default:
        return '#6B7280'; // gray-500
    }
  };

  // Update the flow graph when the AST changes
  React.useEffect(() => {
    if (ast) {
      const { nodes: flowNodes, edges: flowEdges } = transformASTToFlow(ast);
      setNodes(flowNodes);
      setEdges(flowEdges);
    }
  }, [ast, transformASTToFlow]);

  return (
    // Container for the flow graph
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        {/* Flow graph controls and features */}
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default ASTFlowGraph; 