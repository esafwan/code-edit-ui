import React from 'react'

interface ToggleProps {
  isPreviewMode: boolean
  onToggle: () => void
}

const Toggle: React.FC<ToggleProps> = ({ isPreviewMode, onToggle }) => {
  return (
    <div className="flex items-center bg-gray-700 rounded-full p-0.5">
      <button
        className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
          !isPreviewMode ? 'bg-gray-900 text-gray-200' : 'text-gray-400'
        }`}
        onClick={() => !isPreviewMode || onToggle()}
      >
        Code
      </button>
      <button
        className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
          isPreviewMode ? 'bg-gray-900 text-gray-200' : 'text-gray-400'
        }`}
        onClick={() => isPreviewMode || onToggle()}
      >
        Preview
      </button>
    </div>
  )
}

export default Toggle