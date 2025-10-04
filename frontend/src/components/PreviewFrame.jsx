import React from 'react';
import { Card } from './ui/card';

const PreviewFrame = ({ project, mode }) => {
  const getFrameClass = () => {
    switch (mode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  const getFrameHeight = () => {
    switch (mode) {
      case 'mobile':
        return 'h-[600px]';
      case 'tablet':
        return 'h-[500px]';
      case 'desktop':
      default:
        return 'h-full';
    }
  };

  return (
    <div className={`${getFrameClass()} ${getFrameHeight()}`}>
      <Card className="h-full bg-white border-2 border-slate-600 overflow-hidden">
        <iframe
          srcDoc={project.preview}
          className="w-full h-full border-none"
          title="Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </Card>
    </div>
  );
};

export default PreviewFrame;