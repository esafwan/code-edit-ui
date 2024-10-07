import React from 'react'
import { File, Directory } from '../types'
import { FolderIcon, FileIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import Toolbar from './Toolbar'

interface FileListItemProps {
  item: File | Directory
  depth: number
  onFileSelect: (file: File) => void
  activeFile: File | null
}

const FileListItem: React.FC<FileListItemProps> = ({ item, depth, onFileSelect, activeFile }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleOpen = () => {
    if (item.type === 'directory') {
      setIsOpen(!isOpen)
    }
  }

  const isActive = activeFile && item.type === 'file' && item.id === activeFile.id

  return (
    <li className={`pl-${depth * 3}`}>
      <div
        className={`flex items-center py-0.5 px-1 cursor-pointer hover:bg-gray-700 ${
          isActive ? 'bg-gray-700' : ''
        }`}
        onClick={toggleOpen}
      >
        {item.type === 'directory' ? (
          <>
            {isOpen ? (
              <ChevronDownIcon className="w-3 h-3 mr-1" />
            ) : (
              <ChevronRightIcon className="w-3 h-3 mr-1" />
            )}
            <FolderIcon className="w-3 h-3 mr-1" />
          </>
        ) : (
          <FileIcon className="w-3 h-3 mr-1" />
        )}
        <span
          className="truncate"
          onClick={() => item.type === 'file' && onFileSelect(item)}
        >
          {item.name}
        </span>
      </div>
      {item.type === 'directory' && isOpen && (
        <ul>
          {item.children.map((child, index) => (
            <FileListItem
              key={index}
              item={child}
              depth={depth + 1}
              onFileSelect={onFileSelect}
              activeFile={activeFile}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

interface FileListProps {
  files: Directory
  onFileSelect: (file: File) => void
  activeFile: File | null
}

const FileList: React.FC<FileListProps> = ({ files, onFileSelect, activeFile }) => {
  return (
    <div className="flex flex-col h-full bg-gray-800 border-r border-gray-700">
      <div className="p-1 border-b border-gray-700 h-7">
        <Toolbar />
      </div>
      <div className="flex-1 overflow-auto p-1">
        <ul className="text-xs">
          {files.children.map((item, index) => (
            <FileListItem
              key={index}
              item={item}
              depth={0}
              onFileSelect={onFileSelect}
              activeFile={activeFile}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FileList