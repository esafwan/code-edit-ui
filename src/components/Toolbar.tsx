import React from 'react'
import { PlusIcon, FolderPlusIcon, SearchIcon, TrashIcon } from 'lucide-react'

const Toolbar: React.FC = () => {
  return (
    <div className="flex space-x-1">
      <button className="p-0.5 hover:bg-gray-700 rounded" title="New File">
        <PlusIcon className="w-3 h-3 text-gray-300" />
      </button>
      <button className="p-0.5 hover:bg-gray-700 rounded" title="New Folder">
        <FolderPlusIcon className="w-3 h-3 text-gray-300" />
      </button>
      <button className="p-0.5 hover:bg-gray-700 rounded" title="Search">
        <SearchIcon className="w-3 h-3 text-gray-300" />
      </button>
      <button className="p-0.5 hover:bg-gray-700 rounded" title="Delete">
        <TrashIcon className="w-3 h-3 text-gray-300" />
      </button>
    </div>
  )
}

export default Toolbar