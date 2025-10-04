import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';
import { 
  ArrowLeft, 
  Play, 
  Download, 
  Share2, 
  Settings, 
  File, 
  Folder, 
  Eye,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  Save,
  Zap
} from 'lucide-react';
import { generateMockProject, mockProjects } from '../utils/mockData';
import CodeEditor from '../components/CodeEditor';
import PreviewFrame from '../components/PreviewFrame';
import FileTree from '../components/FileTree';
import { useToast } from '../hooks/use-toast';

const EditorPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load project data
    if (projectId) {
      // In a real app, this would fetch from an API
      const mockProject = mockProjects.find(p => p.id === projectId) || 
                         generateMockProject('Sample project');
      setProject({ ...mockProject, id: projectId });
      
      // Set the first file as active
      if (mockProject.files && mockProject.files.length > 0) {
        setActiveFile(mockProject.files[0]);
      }
    }
  }, [projectId]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Projet sauvegardé",
        description: "Vos modifications ont été enregistrées"
      });
    }, 1000);
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleDeploy = () => {
    toast({
      title: "Déploiement initié",
      description: "Votre application sera disponible dans quelques minutes"
    });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Accueil
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded flex items-center justify-center text-xs font-bold">
                A0
              </div>
              <h1 className="text-lg font-semibold">{project.name}</h1>
              <Badge variant="secondary" className="bg-slate-700">
                {project.framework}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="text-gray-400 hover:text-white"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Sauvegarder
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreview}
              className="text-gray-400 hover:text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? 'Éditeur' : 'Aperçu'}
            </Button>
            
            <Button
              size="sm"
              onClick={handleDeploy}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Déployer
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {!isPreviewMode && (
          <>
            {/* Sidebar - File Explorer */}
            <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
              <div className="p-4 border-b border-slate-700">
                <h2 className="text-sm font-semibold text-gray-300 mb-3">EXPLORATEUR</h2>
                <FileTree 
                  files={project.files} 
                  activeFile={activeFile}
                  onFileSelect={setActiveFile}
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">FONCTIONNALITÉS</h3>
                <div className="space-y-2">
                  {project.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Main editor area */}
            <div className="flex-1 flex flex-col">
              {/* File tabs */}
              {activeFile && (
                <div className="bg-slate-800 border-b border-slate-700 px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <File className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">{activeFile.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {activeFile.language}
                    </Badge>
                  </div>
                </div>
              )}
              
              {/* Code editor */}
              <div className="flex-1">
                {activeFile ? (
                  <CodeEditor file={activeFile} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Sélectionnez un fichier pour commencer à éditer</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Preview panel */}
        {isPreviewMode && (
          <div className="flex-1 flex flex-col">
            {/* Preview controls */}
            <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-300">Aperçu</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setPreviewMode('desktop')}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewMode === 'tablet' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setPreviewMode('tablet')}
                    >
                      <Tablet className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setPreviewMode('mobile')}
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualiser
                </Button>
              </div>
            </div>
            
            {/* Preview frame */}
            <div className="flex-1 bg-slate-700 p-4">
              <PreviewFrame 
                project={project} 
                mode={previewMode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPage;