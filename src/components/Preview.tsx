import React, { useState, useEffect } from 'react'
import { Directory } from '../types'
import { RefreshCwIcon } from 'lucide-react'

interface PreviewProps {
  files: Directory
}

const Preview: React.FC<PreviewProps> = ({ files }) => {
  const [url, setUrl] = useState('preview.html')
  const [key, setKey] = useState(0)

  useEffect(() => {
    const blob = new Blob([getFileContent(files, 'index.html')], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    setUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [files])

  const getFileContent = (dir: Directory, fileName: string): string => {
    for (const item of dir.children) {
      if (item.type === 'file' && item.name === fileName) {
        return item.content
      } else if (item.type === 'directory') {
        const content = getFileContent(item, fileName)
        if (content) return content
      }
    }
    return ''
  }

  const handleRefresh = () => {
    setKey(prevKey => prevKey + 1)
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="bg-gray-800 border-b border-gray-700 p-1 flex items-center space-x-2">
        <button
          onClick={handleRefresh}
          className="p-0.5 rounded-full hover:bg-gray-700"
        >
          <RefreshCwIcon className="w-3 h-3 text-gray-300" />
        </button>
        <input
          type="text"
          value={url}
          readOnly
          className="flex-1 p-0.5 rounded-full bg-gray-700 text-xs text-gray-300"
        />
      </div>
      <iframe
        key={key}
        src={url}
        className="flex-1 w-full bg-white"
        title="Preview"
      />
    </div>
  )
}

export default Preview