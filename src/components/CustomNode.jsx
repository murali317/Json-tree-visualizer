import { Handle, Position } from 'reactflow';

export default function CustomNode({ data }) {
  const { type, keyLabel, valueLabel, label } = data;

  const styleConfig = {
    object: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      border: 'border-blue-500 dark:border-blue-400',
      text: 'text-blue-900 dark:text-blue-100',
      badge: 'bg-blue-500 text-white'
    },
    array: {
      bg: 'bg-green-100 dark:bg-green-900',
      border: 'border-green-500 dark:border-green-400',
      text: 'text-green-900 dark:text-green-100',
      badge: 'bg-green-500 text-white'
    },
    primitive: {
      bg: 'bg-amber-100 dark:bg-amber-900',
      border: 'border-amber-500 dark:border-amber-400',
      text: 'text-amber-900 dark:text-amber-100',
      badge: 'bg-amber-500 text-white'
    }
  };

  const config = styleConfig[type] || styleConfig.primitive;

  return (
    <div className={`px-4 py-3 rounded-lg border-2 ${config.bg} ${config.border} ${config.text} min-w-[220px] shadow-md`}>
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      
      {type === 'primitive' ? (
        <div className="space-y-1">
          <div className="text-xs font-semibold opacity-70">{keyLabel}</div>
          <div className="font-medium text-sm break-all">{valueLabel}</div>
        </div>
      ) : (
        <div className="font-semibold text-sm">{label}</div>
      )}
      
      <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
    </div>
  );
}
