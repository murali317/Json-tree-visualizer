import { useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  useReactFlow,
  Panel,
  getNodesBounds,
  getViewportForBounds,
} from 'reactflow';
import { toPng } from 'html-to-image';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';

// Define custom node types for React Flow
const nodeTypes = {
  default: CustomNode
};
const edgeTypes = {};

function Inner({ nodes, edges, highlightNodeId, onNodeClick }) {
  const { setCenter, fitView, getNodes } = useReactFlow()
  
  useEffect(() => { fitView({ padding: 0.1 }) }, [nodes, fitView])

  useEffect(() => {
    if (!highlightNodeId) return
    const node = nodes.find(n => n.id === highlightNodeId)
    if (node) {
      const { x, y } = node.position
      setCenter(x + (node.width || 200)/2, y + (node.height || 40)/2, { zoom: 0.8 })
    }
  }, [highlightNodeId, nodes, setCenter])

  const downloadImage = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      1920,
      1080,
      0.5,
      2,
      0.1
    );

    const viewportElement = document.querySelector('.react-flow__viewport');
    
    if (!viewportElement) return;

    toPng(viewportElement, {
      backgroundColor: '#ffffff',
      width: 1920,
      height: 1080,
      style: {
        width: '1920px',
        height: '1080px',
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then((dataUrl) => {
      const a = document.createElement('a');
      a.setAttribute('download', 'json-tree-visualizer.png');
      a.setAttribute('href', dataUrl);
      a.click();
    }).catch((err) => {
      console.error('Failed to download image:', err);
    });
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodeClick={onNodeClick}
      fitView
    >
      <MiniMap />
      <Controls />
      <Background />
      <Panel position="top-right" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
        <button
          onClick={downloadImage}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          title="Download as PNG"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Image
        </button>
      </Panel>
    </ReactFlow>
  )
}

export default function JsonTree({ graph, highlightNodeId }) {
  // nodes & edges from props need to be in React Flow format with positions
  // We'll keep them in state for potential interactive updates (highlighting)
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [toast, setToast] = useState({ show: false, message: '' })

  useEffect(() => {
    setNodes(graph.nodes || [])
    setEdges(graph.edges || [])
  }, [graph])

  // Handle node click to copy path
  const handleNodeClick = (event, node) => {
    const path = node.data.path || node.id
    
    // Copy to clipboard
    navigator.clipboard.writeText(path).then(() => {
      // Show toast notification
      setToast({ show: true, message: `Copied: ${path}` })
      
      // Hide toast after 2 seconds
      setTimeout(() => {
        setToast({ show: false, message: '' })
      }, 2000)
    }).catch(err => {
      console.error('Failed to copy:', err)
      setToast({ show: true, message: 'Failed to copy path' })
      setTimeout(() => {
        setToast({ show: false, message: '' })
      }, 2000)
    })
  }

  // apply highlight style
  const nodesWithStyle = nodes.map(n => ({
    ...n,
    style: {
      ...(n.style || {}),
      boxShadow: n.id === highlightNodeId ? '0 0 0 6px rgba(99,102,241,0.16)' : undefined,
      cursor: 'pointer'
    }
  }))

  return (
    <div className="w-full h-full relative">
      {/* Toast notification */}
      {toast.show && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg shadow-lg transition-opacity">
          {toast.message}
        </div>
      )}
      
      <ReactFlowProvider>
        <div className="h-full">
          <Inner nodes={nodesWithStyle} edges={edges} highlightNodeId={highlightNodeId} onNodeClick={handleNodeClick} />
        </div>
      </ReactFlowProvider>
    </div>
  )
}
