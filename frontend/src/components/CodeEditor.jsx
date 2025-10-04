import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const CodeEditor = ({ file }) => {
  const [content, setContent] = useState(file?.content || '');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast({
        title: "Code copié",
        description: "Le code a été copié dans le presse-papier"
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le code",
        variant: "destructive"
      });
    }
  };

  const getLanguageColor = (language) => {
    switch (language) {
      case 'javascript': return 'text-yellow-400';
      case 'html': return 'text-orange-400';
      case 'css': return 'text-blue-400';
      case 'json': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  if (!file) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Aucun fichier sélectionné</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Editor header */}
      <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-mono ${getLanguageColor(file.language)}`}>
            {file.language}
          </span>
          <span className="text-gray-400 text-sm">•</span>
          <span className="text-gray-400 text-sm">{file.path}</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-gray-400 hover:text-white"
        >
          {copied ? (
            <Check className="w-4 h-4 mr-2" />
          ) : (
            <Copy className="w-4 h-4 mr-2" />
          )}
          {copied ? 'Copié' : 'Copier'}
        </Button>
      </div>

      {/* Code editor */}
      <div className="flex-1 relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full p-4 pl-12 bg-slate-900 text-gray-100 font-mono text-sm resize-none border-none outline-none leading-6"
          spellCheck={false}
          style={{
            tabSize: 2,
            fontFamily: 'Fira Code, Consolas, Monaco, monospace'
          }}
        />
        
        {/* Line numbers overlay */}
        <div className="absolute top-0 left-0 p-4 pointer-events-none text-gray-600 font-mono text-sm leading-6 select-none">
          {content.split('\n').map((_, index) => (
            <div key={index} className="text-right w-8">
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-slate-800 border-t border-slate-700 px-4 py-2 text-xs text-gray-400 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span>Lignes: {content.split('\n').length}</span>
          <span>Caractères: {content.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Sauvegardé automatiquement</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;