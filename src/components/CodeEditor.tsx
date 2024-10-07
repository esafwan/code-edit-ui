import React from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'
import { File } from '../types'
import { XIcon } from 'lucide-react'

interface CodeEditorProps {
  openFiles: File[]
  activeFile: File | null
  onCodeChange: (code: string) => void
  onFileClose: (fileId: string) => void
  onFileSelect: (file: File) => void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ openFiles, activeFile, onCodeChange, onFileClose, onFileSelect }) => {
  if (!activeFile) {
    return <div className="flex-1 p-4 bg-gray-900 text-gray-300">No file selected</div>
  }

  const getLanguage = (fileName: string) => {
    if (fileName.endsWith('.html')) return languages.html
    if (fileName.endsWith('.css')) return languages.css
    if (fileName.endsWith('.js')) return languages.javascript
    return languages.markup
  }

  const highlightWithLineNumbers = (code: string) => {
    const lines = code.split('\n')
    return lines.map((line, i) => (
      <div key={i} className="table-row">
        <span className="table-cell text-right pr-4 select-none opacity-50">{i + 1}</span>
        <span className="table-cell" dangerouslySetInnerHTML={{ __html: highlight(line, getLanguage(activeFile.name), activeFile.name) }} />
      </div>
    ))
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="flex bg-gray-800 border-b border-gray-700">
        {openFiles.map(file => (
          <div
            key={file.id}
            className={`flex items-center px-2 py-0.5 cursor-pointer text-xs ${
              file.id === activeFile.id ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
            onClick={() => onFileSelect(file)}
          >
            <span className="mr-1 truncate max-w-xs">{file.name}</span>
            <XIcon
              className="w-3 h-3 text-gray-400 hover:text-gray-200"
              onClick={(e) => {
                e.stopPropagation()
                onFileClose(file.id)
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-auto">
        <Editor
          value={activeFile.content}
          onValueChange={onCodeChange}
          highlight={highlightWithLineNumbers}
          padding={8}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
          }}
          textareaClassName="focus:outline-none"
          preClassName="table"
        />
      </div>
    </div>
  )
}

export default CodeEditor