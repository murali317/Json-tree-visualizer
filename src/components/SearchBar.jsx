import React, { useState } from 'react'
import { findPaths } from '../utils/jsonPathFinder'

export default function SearchBar({ onSearch, onNext, onPrev, currentIndex, totalMatches }) {
  const [q, setQ] = useState('')
  const [message, setMessage] = useState('')

  const handleClick = () => {
    if (!q) { setMessage('Enter a search term or JSON path'); return }
    // Use provided finder inside App via callback
    const result = onSearch(q, findPaths)
    if (!result) { setMessage('No JSON loaded') ; return }
    if (result.found) setMessage(`${result.count} match${result.count > 1 ? 'es' : ''} found`)
    else setMessage('No match found')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Search</label>
      <input
        className="w-full border dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        placeholder='Search by key, value, or path (e.g., firstName, John, $.employees[0])'
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div className="flex gap-2 mt-2">
        <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleClick}>
          Search
        </button>
        {totalMatches > 0 && (
          <>
            <button 
              className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700" 
              onClick={onPrev}
              disabled={totalMatches === 0}
            >
              ← Prev
            </button>
            <button 
              className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700" 
              onClick={onNext}
              disabled={totalMatches === 0}
            >
              Next →
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400 self-center">
              {currentIndex + 1} / {totalMatches}
            </div>
          </>
        )}
      </div>
      {message && <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{message}</div>}
    </div>
  )
}
