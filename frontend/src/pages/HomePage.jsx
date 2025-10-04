import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Sparkles, Zap, Code, Rocket, ArrowRight, Play } from 'lucide-react';
import { generateMockProject } from '../utils/mockData';
import { useToast } from '../hooks/use-toast';

const HomePage = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt requis",
        description: "Veuillez décrire ce que vous voulez construire",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockProject = generateMockProject(prompt);
      setIsGenerating(false);
      toast({
        title: "Projet généré!",
        description: "Votre application a été créée avec succès"
      });
      navigate(`/editor/${mockProject.id}`);
    }, 3000);
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "IA Générative",
      description: "Créez des applications complètes avec de simples descriptions"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Éditeur Intégré",
      description: "Modifiez votre code en temps réel avec aperçu instantané"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Déploiement Rapide",
      description: "Publiez votre application en un clic"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Frameworks Modernes",
      description: "Support complet pour React, Vue, Angular et plus"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center p-6 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center font-bold text-sm">
              A0
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Alt0
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Exemples
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Documentation
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              Connexion
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Que devons-nous
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                construire aujourd'hui ?
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Créez des applications et sites web époustouflants en discutant avec notre IA.
              Transformez vos idées en code fonctionnel en quelques secondes.
            </p>
          </div>

          {/* Main input section */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
                <Textarea
                  placeholder="Décrivez votre idée et nous la construirons ensemble...\nExemple: 'Créer un dashboard e-commerce avec graphiques en temps réel'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-32 bg-transparent border-none text-white placeholder-gray-400 text-lg resize-none focus:ring-0"
                />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Propulsé par l'IA avancée</span>
                  </div>
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold px-8 py-3 rounded-lg disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Génération...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Construire
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-purple-400/30 hover:-translate-y-2"
              >
                <div className="mb-4 text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Prêt à créer quelque chose d'extraordinaire ?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Rejoignez des milliers de développeurs qui utilisent Alt0 pour construire l'avenir
            </p>
            <Button
              onClick={() => document.querySelector('textarea').focus()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold px-12 py-4 text-lg rounded-xl"
            >
              Commencer maintenant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;