// returns array of { path, nodeId }
export function findPaths(root, query) {
  if (!query) return []
  const q = query.trim()
  
  // If query looks like a JSONPath (starts with $ or contains . or [), use exact path matching
  if (q.startsWith('$') || q.includes('.') || q.includes('[')) {
    return findExactPath(root, q)
  }
  
  // Otherwise, search for key or value matches
  return findByKeyOrValue(root, q)
}

// Find exact JSONPath
function findExactPath(root, query) {
  let q = query.trim()
  if (q.startsWith('$.')) q = q.slice(2)
  
  const tokens = []
  let i = 0
  while (i < q.length) {
    if (q[i] === '[') {
      const close = q.indexOf(']', i)
      if (close === -1) {
        tokens.push(q.slice(i+1))
        break
      }
      tokens.push(q.slice(i+1, close))
      i = close + 1
      if (q[i] === '.') i++
    } else {
      const dot = q.indexOf('.', i)
      const bracket = q.indexOf('[', i)
      let end = q.length
      if (dot !== -1) end = Math.min(end, dot)
      if (bracket !== -1) end = Math.min(end, bracket)
      tokens.push(q.slice(i, end))
      i = end
      if (q[i] === '.') i++
    }
  }

  const results = []
  
  function walk(obj, idx, curPath) {
    if (idx >= tokens.length) {
      results.push({ path: curPath || '$', nodeId: curPath || '$' })
      return
    }
    const token = tokens[idx]
    if (Array.isArray(obj)) {
      const num = Number(token)
      if (!Number.isNaN(num) && obj[num] !== undefined) {
        const np = `${curPath}[${num}]`
        walk(obj[num], idx+1, np)
      }
    } else if (obj && typeof obj === 'object') {
      if (Object.prototype.hasOwnProperty.call(obj, token)) {
        const np = curPath === '$' ? `$.${token}` : `${curPath}.${token}`
        walk(obj[token], idx+1, np)
      }
    }
  }

  walk(root, 0, '$')
  return results
}

// Search for key names or values
function findByKeyOrValue(root, query) {
  const results = []
  const lowerQuery = query.toLowerCase()
  
  function traverse(obj, curPath) {
    if (obj === null || obj === undefined) return
    
    if (Array.isArray(obj)) {
      obj.forEach((item, idx) => {
        const childPath = `${curPath}[${idx}]`
        traverse(item, childPath)
      })
    } else if (typeof obj === 'object') {
      Object.entries(obj).forEach(([key, value]) => {
        const childPath = curPath === '$' ? `$.${key}` : `${curPath}.${key}`
        
        // Check if key matches
        if (key.toLowerCase().includes(lowerQuery)) {
          results.push({ path: childPath, nodeId: childPath })
        }
        
        // Check if value matches (for primitives)
        if (value !== null && typeof value !== 'object') {
          if (String(value).toLowerCase().includes(lowerQuery)) {
            results.push({ path: childPath, nodeId: childPath })
          }
        }
        
        // Recurse into nested structures
        traverse(value, childPath)
      })
    }
  }
  
  traverse(root, '$')
  return results
}
