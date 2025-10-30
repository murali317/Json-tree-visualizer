const NODE_WIDTH = 220
const NODE_HEIGHT = 54
const HORIZONTAL_SPACING = 150  // Increased from 100
const VERTICAL_SPACING = 150    // Increased from 120

export function jsonToGraph(root) {
  const nodes = []
  const edges = []
  // counters per depth for x position
  const xCounters = {}

  function posFor(depth) {
    if (!xCounters[depth]) xCounters[depth] = 0
    const x = xCounters[depth] * (NODE_WIDTH + HORIZONTAL_SPACING)
    const y = depth * (NODE_HEIGHT + VERTICAL_SPACING)
    xCounters[depth] += 1
    return { x, y }
  }

  function typeOf(val) {
    if (val === null) return 'primitive'
    if (Array.isArray(val)) return 'array'
    if (typeof val === 'object') return 'object'
    return 'primitive'
  }

  function traverse(val, path, depth, parentPath=null, labelKey=null) {
    const id = path // use path as node id for stability
    const type = typeOf(val)
    const pos = posFor(depth)
    
    const keyLabel = labelKey || '$'
    const valueLabel = type === 'primitive' ? String(val) : ''
    
    const label = (() => {
      if (type === 'object' && path === '$') return 'Root Object'
      if (type === 'object') return keyLabel
      if (type === 'array') return `${keyLabel} [${val.length}]`
      return valueLabel
    })()

    nodes.push({
      id,
      position: pos,
      data: { 
        label, 
        path: path, 
        value: val, 
        type,
        keyLabel,
        valueLabel 
      }
    })

    if (parentPath) {
      edges.push({ 
        id: `e-${parentPath}-${id}`, 
        source: parentPath, 
        target: id, 
        animated: false,
        type: 'smoothstep',
        style: { stroke: '#94a3b8', strokeWidth: 2 }
      })
    }

    if (type === 'object') {
      Object.entries(val).forEach(([k, v]) => {
        const childPath = path === '$' ? `$.${k}` : `${path}.${k}`
        traverse(v, childPath, depth+1, id, k)
      })
    } else if (type === 'array') {
      val.forEach((el, idx) => {
        const childPath = `${path}[${idx}]`
        traverse(el, childPath, depth+1, id, String(idx))
      })
    }
  }

  traverse(root, '$', 0, null, '$')
  return { nodes, edges }
}
