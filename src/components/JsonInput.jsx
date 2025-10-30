import React, { useState, useEffect } from 'react'

export default function JsonInput({ onParse, initialText='' }) {
  const [text, setText] = useState(initialText)

  useEffect(() => {
    // if initialText set from App, update
    setText(initialText)
  }, [initialText])

  const sample = `{
  "user": {
    "id": 123,
    "name": "Alice",
    "address": {
      "city": "Bengal",
      "zip": "560001"
    }
  },
  "items": [
    { "id": 1, "name": "Pen" },
    { "id": 2, "name": "Notebook" }
  ],
  "active": true
}`

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Paste JSON</label>
      <textarea
        className="w-full h-56 p-2 border dark:border-gray-600 rounded text-sm font-mono bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        placeholder={sample}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-3 flex gap-2">
        <button
          className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => onParse(text)}
        >Visualize</button>
        <button
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
          onClick={() => { setText(''); onParse('') }}
        >Clear</button>
      </div>
    </div>
  )
}
