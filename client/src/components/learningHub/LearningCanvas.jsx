import { useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import SmartNotesDrawer from "./SmartNotesDrawer";

import { buildGraph } from "../../utils/buildGraph";
import RootNode from "./RootNode";
import CategoryNode from "./CategoryNode";
import TopicNode from "./TopicNode";



const nodeTypes = {
  root: RootNode,
  category: CategoryNode,
  topic: TopicNode,
};

export default function LearningCanvas({ roadmap }) {
  const [expandedCategories, setExpandedCategories] = useState([]);
  

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  const [selectedTopic, setSelectedTopic] = useState(null);

   const { nodes, edges } = useMemo(
  () =>
    buildGraph(
      roadmap,
      expandedCategories,
      toggleCategory,
      setSelectedTopic
    ),
  [roadmap, expandedCategories]
);

  return (
    <div className="h-screen w-full bg-slate-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
      <SmartNotesDrawer
        topic={selectedTopic}
        roadmapId={roadmap._id}
        onClose={() => setSelectedTopic(null)}
      />
    </div>
  );
}