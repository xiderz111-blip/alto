import React from 'react';
import { File, Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const FileTree = ({ files, activeFile, onFileSelect }) => {
  const getFileIcon = (language) => {
    switch (language) {
      case 'javascript':
        return <File className="w-4 h-4 text-yellow-400" />;
      case 'html':
        return <File className="w-4 h-4 text-orange-400" />;
      case 'css':
        return <File className="w-4 h-4 text-blue-400" />;
      case 'json':
        return <File className="w-4 h-4 text-green-400" />;
      default:
        return <File className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-1">
      {files?.map((file, index) => (
        <Button
          key={index}
          variant="ghost"
          size="sm"
          className={`w-full justify-start text-left font-normal hover:bg-slate-700 ${
            activeFile?.name === file.name ? 'bg-slate-700 text-white' : 'text-gray-300'
          }`}
          onClick={() => onFileSelect(file)}
        >
          <div className="flex items-center space-x-2 text-sm">
            {getFileIcon(file.language)}
            <span className="truncate">{file.name}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default FileTree;