import React, { useState } from 'react'
import FileList from './components/FileList'
import CodeEditor from './components/CodeEditor'
import Preview from './components/Preview'
import Toggle from './components/Toggle'
import { File, Directory } from './types'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

const initialFiles: Directory = {
  name: 'root',
  type: 'directory',
  children: [
    {
      id: '1',
      name: 'index.html',
      type: 'file',
      content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Project</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>'
    },
    {
      id: '2',
      name: 'styles.css',
      type: 'file',
      content: 'body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n}\n\nh1 {\n  color: #333;\n}'
    },
    {
      id: '3',
      name: 'script.js',
      type: 'file',
      content: 'console.log("Hello from JavaScript!");\n\ndocument.addEventListener("DOMContentLoaded", () => {\n  const h1 = document.querySelector("h1");\n  if (h1) {\n    h1.textContent = "Hello from JavaScript!";\n  }\n});'
    },
    {
      name: 'src',
      type: 'directory',
      children: [
        {
          id: '4',
          name: 'utils.js',
          type: 'file',
          content: 'export function greet(name) {\n  return `Hello, ${name}!`;\n}'
        }
      ]
    }
  ]
}

function App() {
  const [files, setFiles] = useState<Directory>(initialFiles)
  const [openFiles, setOpenFiles] = useState<File[]>([])
  const [activeFile, setActiveFile] = useState<File | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const handleFileSelect = (file: File) => {
    setActiveFile(file)
    if (!openFiles.some(f => f.id === file.id)) {
      setOpenFiles([...openFiles, file])
    }
  }

  const handleCodeChange = (newCode: string) => {
    if (activeFile) {
      const updatedFiles = updateFileContent(files, activeFile.id, newCode)
      setFiles(updatedFiles)
      setOpenFiles(openFiles.map(f => f.id === activeFile.id ? { ...f, content: newCode } : f))
      setActiveFile({ ...activeFile, content: newCode })
    }
  }

  const handleFileClose = (fileId: string) => {
    setOpenFiles(openFiles.filter(f => f.id !== fileId))
    if (activeFile && activeFile.id === fileId) {
      setActiveFile(openFiles[openFiles.length - 2] || null)
    }
  }

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode)
  }

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }

  const updateFileContent = (dir: Directory, fileId: string, newContent: string): Directory => {
    return {
      ...dir,
      children: dir.children.map(item => {
        if (item.type === 'file' && item.id === fileId) {
          return { ...item, content: newContent }
        } else if (item.type === 'directory') {
          return updateFileContent(item, fileId, newContent)
        }
        return item
      })
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-300 text-xs">
      <div className={`flex flex-col ${isSidebarVisible ? 'w-48' : 'w-0'} transition-all duration-300 ease-in-out`}>
        {isSidebarVisible && <FileList files={files} onFileSelect={handleFileSelect} activeFile={activeFile} />}
      </div>
      <button
        onClick={toggleSidebar}
        className="absolute top-1 left-1 z-10 p-1 bg-gray-800 rounded-full hover:bg-gray-700"
      >
        {isSidebarVisible ? <ChevronLeftIcon className="w-3 h-3" /> : <ChevronRightIcon className="w-3 h-3" />}
      </button>
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-800 border-b border-gray-700 p-1 flex justify-end items-center h-7">
          <Toggle isPreviewMode={isPreviewMode} onToggle={togglePreviewMode} />
        </div>
        {isPreviewMode ? (
          <Preview files={files} />
        ) : (
          <CodeEditor
            openFiles={openFiles}
            activeFile={activeFile}
            onCodeChange={handleCodeChange}
            onFileClose={handleFileClose}
            onFileSelect={setActiveFile}
          />
        )}
      </div>
    </div>
  )
}

export default App