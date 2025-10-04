# Alt0 - Contrats de l'Application

## Vue d'ensemble
Alt0 est un clone moderne et dynamique de bolt.new, permettant aux utilisateurs de générer des applications web complètes via IA (mockée) avec un éditeur de code intégré et un système de prévisualisation.

## API Contracts (Backend Future Implementation)

### 1. Génération de Projets
```
POST /api/projects/generate
Body: {
  "prompt": string,
  "framework": "React" | "Vue" | "Angular" (optionnel)
}
Response: {
  "id": string,
  "name": string,
  "type": string,
  "framework": string,
  "features": string[],
  "files": File[],
  "createdAt": string
}
```

### 2. Gestion des Projets
```
GET /api/projects/:id
GET /api/projects/user/:userId
POST /api/projects/:id/save
DELETE /api/projects/:id
```

### 3. Gestion des Fichiers
```
GET /api/projects/:id/files
PUT /api/projects/:id/files/:fileId
POST /api/projects/:id/files
DELETE /api/projects/:id/files/:fileId
```

### 4. Déploiement
```
POST /api/projects/:id/deploy
GET /api/projects/:id/deployment-status
```

## Données Mockées Actuelles

### Frontend (mockData.js)
- `generateMockProject()` - Génération de projets basée sur le prompt
- `mockProjects[]` - Projets de démonstration
- Génération de fichiers de code (React, HTML, CSS, JSON)
- Système de preview HTML intégré

## Intégration Frontend-Backend Future

### 1. Remplacement des Mocks
- Remplacer `generateMockProject()` par des appels API réels
- Intégrer un vrai système d'IA pour la génération de code
- Implémenter la sauvegarde persistante en base de données

### 2. État de l'application
- Gestion des états de chargement
- Gestion d'erreurs robuste
- Mise à jour en temps réel des projets

### 3. Authentification
- Système de login/registration
- Gestion des sessions utilisateur
- Protection des routes privées

## Architecture Technique

### Frontend
- **React 19** avec React Router
- **Tailwind CSS** + **shadcn/ui** pour l'interface
- **Lucide React** pour les icônes
- Structure modulaire avec composants réutilisables

### Backend (À implémenter)
- **FastAPI** avec MongoDB
- Endpoints RESTful
- Gestion de fichiers et projets
- Intégration IA pour génération de code

### Fonctionnalités Implémentées
1. ✅ Page d'accueil avec interface de génération
2. ✅ Interface éditeur complète avec file explorer
3. ✅ Éditeur de code avec coloration syntaxique
4. ✅ Système de prévisualisation responsive
5. ✅ Navigation fluide entre modes
6. ✅ Animations et transitions modernes
7. ✅ Gestion d'état local pour les projets

### Fonctionnalités à Ajouter (Backend)
1. ⏳ Authentification utilisateur
2. ⏳ Persistance en base de données
3. ⏳ Génération IA réelle
4. ⏳ Système de déploiement
5. ⏳ Collaboration en temps réel
6. ⏳ Gestion de versions des projets

## Notes d'Implémentation
- Toutes les données sont actuellement mockées pour la démonstration
- L'interface est fully fonctionnelle et prête pour l'intégration backend
- Le design suit les meilleures pratiques modernes avec gradients subtils et animations fluides
- La structure du code est modulaire et facilement extensible