const NODE_WIDTH = 220
const NODE_HEIGHT = 54

export function jsonToGraph(root) {
  const nodes = []
  const edges = []
  // counters per depth for x position
  const xCounters = {}

  function posFor(depth) {
    if (!xCounters[depth]) xCounters[depth] = 0
    const x = xCounters[depth] * (NODE_WIDTH + 60)
    const y = depth * (NODE_HEIGHT + 80)
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
    const label = (() => {
      if (type === 'object' && path === '$') return 'Root Object'
      if (type === 'object') return `${labelKey || '$'} (object)`
      if (type === 'array') return `${labelKey || '$'} (array)`
      return `${labelKey || '$'}: ${String(val)}`
    })()

    nodes.push({
      id,
      position: pos,
      data: { label, path: path, value: val, type },
      style: {
        minWidth: NODE_WIDTH,
        padding: 8,
        borderRadius: 8,
        border: '1px solid rgba(0,0,0,0.06)',
        background: type === 'object' ? '#eef2ff' : (type === 'array' ? '#ecfdf5' : '#fff7ed')
      }
    })

    if (parentPath) {
      edges.push({ id: `e-${parentPath}-${id}`, source: parentPath, target: id, animated: false })
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
