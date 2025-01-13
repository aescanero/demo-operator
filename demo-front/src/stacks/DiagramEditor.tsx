import React, { useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ReactFlow, { Node, Edge, Background, Controls, FitViewOptions, DefaultEdgeOptions, NodeTypes, OnNodesChange, applyNodeChanges, OnEdgesChange, applyEdgeChanges, OnConnect } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
 ];
const initialEdges: Edge[] = [];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const flowStyles = { background:"#192a43", height: "30em", boxShadow:"0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)" };

function DiagramEditor({ onSave }: { onSave: (nodes: any[], edges: any[]) => void }) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);


  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  /* const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  ); */

  const addNode = () => {
    // Agregar un nuevo nodo al estado de nodos
    const newNode = {
      id: Date.now().toString(),
      type: 'default',
      data: { label: 'Nuevo Nodo' },
      position: { x: 0, y: 0 },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const addEdge = (source: string | null, target: string | null) => {
    if (source !== null && target !== null) {
      // Agregar una nueva conexión (edge) al estado de conexiones
      const newEdge = {
        id: `${source}-${target}`,
        source,
        target,
      };
      setEdges((prevEdges) => [...prevEdges, newEdge]);
    }
  };

  return (
    <Box display={{ xs: 'block', sm: 'flex', width: '800px', height: '350px' }}>
      <button onClick={addNode}>Agregar Nodo</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        onConnect={(params) => addEdge(params.source, params.target)}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>
      <button onClick={() => onSave(nodes, edges)}>Guardar Diagrama</button>
    </Box>
  );
}

export default DiagramEditor;
