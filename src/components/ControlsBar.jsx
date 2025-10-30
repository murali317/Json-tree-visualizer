// ControlsBar.jsx
// Component for additional controls (placeholder)

export default function ControlsBar({ onExpandAll, onCollapseAll }) {
  return (
    <div className="flex gap-2 mb-2">
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onExpandAll}>
        Expand All
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onCollapseAll}>
        Collapse All
      </button>
    </div>
  );
}
