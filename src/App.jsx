import { useState, useCallback, useEffect } from 'react'
import JsonInput from './components/JsonInput'
import JsonTree from './components/JsonTree'
import SearchBar from './components/SearchBar'
import ThemeToggle from './components/ThemeToggle'
import { jsonToGraph } from './utils/jsonToGraph'

export default function App() {
  const [jsonText, setJsonText] = useState('')
  const [parsedJson, setParsedJson] = useState(null)
  const [graph, setGraph] = useState({ nodes: [], edges: [] })
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [error, setError] = useState('') // stores error text
  const [highlightNodeId, setHighlightNodeId] = useState(null) // stores currently highlighted node ID for searching
  const [searchMatches, setSearchMatches] = useState([]) // stores all search matches
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0) // stores current match index

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleParse = useCallback((text) => { // Handle JSON parsing & errors
    setError('')
    
    // Handle empty input
    if (!text || text.trim() === '') {
      setParsedJson(null)
      setJsonText('')
      setGraph({ nodes: [], edges: [] })
      setHighlightNodeId(null)
      setSearchMatches([])
      setCurrentMatchIndex(0)
      return
    }
    
    try {
      const parsed = JSON.parse(text)
      setParsedJson(parsed)
      setJsonText(text)
      const g = jsonToGraph(parsed)
      setGraph(g)
      setHighlightNodeId(null)
      setSearchMatches([])
      setCurrentMatchIndex(0)
    } catch (e) { // error handling
      setError('Invalid JSON: ' + e.message)
      setParsedJson(null)
      setGraph({ nodes: [], edges: [] })
    }
  }, [])

  const handleSearch = useCallback((query, finder) => {
    if (!parsedJson) return
    const matches = finder(parsedJson, query) // returns array of { path, nodeId }
    if (!matches || matches.length === 0) { // if no matches found
      setHighlightNodeId(null)
      setSearchMatches([])
      setCurrentMatchIndex(0)
      return { found: false, count: 0 }
    }
    // Store all matches and highlight first one
    setSearchMatches(matches)
    setCurrentMatchIndex(0)
    setHighlightNodeId(matches[0].nodeId)
    return { found: true, count: matches.length, nodeId: matches[0].nodeId, matches }
  }, [parsedJson])

  const handleNextMatch = useCallback(() => {
    if (searchMatches.length === 0) return
    const nextIndex = (currentMatchIndex + 1) % searchMatches.length
    setCurrentMatchIndex(nextIndex)
    setHighlightNodeId(searchMatches[nextIndex].nodeId)
  }, [searchMatches, currentMatchIndex])

  const handlePrevMatch = useCallback(() => {
    if (searchMatches.length === 0) return
    const prevIndex = (currentMatchIndex - 1 + searchMatches.length) % searchMatches.length
    setCurrentMatchIndex(prevIndex)
    setHighlightNodeId(searchMatches[prevIndex].nodeId)
  }, [searchMatches, currentMatchIndex])

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="p-4 bg-white dark:bg-gray-800 shadow flex items-center justify-between"> {/* displays app title & subtitle */}
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">JSON Tree Visualizer</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-green-600 dark:text-green-400 font-bold">Frontend take-home — React + React Flow</div>
          <ThemeToggle isDark={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-96 p-4 bg-white dark:bg-gray-800 border-r dark:border-gray-700 overflow-auto"> {/* left panel with input & search controls */}
          <JsonInput onParse={handleParse} initialText={jsonText} />
          {error && <div className="text-red-600 dark:text-red-400 mt-2">{error}</div>}
          <div className="mt-4">
            <SearchBar 
              onSearch={handleSearch} 
              onNext={handleNextMatch}
              onPrev={handlePrevMatch}
              currentIndex={currentMatchIndex}
              totalMatches={searchMatches.length}
            />
          </div>
        </div>

        <div className="flex-1 relative">
          <JsonTree graph={graph} highlightNodeId={highlightNodeId} /> {/* displays the JSON tree */}
        </div>
      </div>
    </div>
  )
}
