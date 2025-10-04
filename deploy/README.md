# Déploiement Alt0 sur HostPapa

## 🚀 Installation Automatique

### Méthode 1: Installation Complète Automatique
```bash
cd /app/deploy
chmod +x install-hostpapa.sh
./install-hostpapa.sh
```

### Méthode 2: Étapes Manuelles

#### Pour Hébergement Partagé HostPapa
```bash
# 1. Build l'application
./build-for-hostpapa.sh shared

# 2. Les fichiers sont créés dans hostpapa-package/
# 3. Uploadez ces fichiers dans public_html via cPanel
```

#### Pour VPS HostPapa
```bash
# 1. Build l'application
./build-for-hostpapa.sh vps

# 2. Transférez hostpapa-vps-package/ sur votre VPS
# 3. Exécutez ./start.sh
```

## ⚙️ Configuration

### Variables d'Environnement
Créez un fichier `.env.hostpapa` :
```bash
HOSTPAPA_HOST=votredomaine.com
HOSTPAPA_USER=votre_username_ftp
HOSTPAPA_PASS=votre_password_ftp
REACT_APP_BACKEND_URL=https://votredomaine.com
```

### Upload Automatique
```bash
# Configuration des variables d'environnement
export HOSTPAPA_HOST="votredomaine.com"
export HOSTPAPA_USER="votre_username"
export HOSTPAPA_PASS="votre_password"

# Upload
./hostpapa-upload.sh shared  # pour hébergement partagé
./hostpapa-upload.sh vps     # pour VPS
```

## 📋 Types d'Hébergement HostPapa

### Hébergement Partagé
- ✅ Fichiers statiques (HTML, CSS, JS)
- ✅ Application React buildée
- ❌ Pas de backend Node.js
- 🔧 Utilise des données mockées

### VPS/Serveur Dédié
- ✅ Application complète (Frontend + Backend)
- ✅ Node.js et MongoDB
- ✅ API complète
- 🔧 Installation automatique des dépendances

## 🛠️ Personnalisation

### Modifier l'URL de Production
Dans `/app/frontend/.env.production` :
```
REACT_APP_BACKEND_URL=https://votredomaine.com
```

### Configuration Apache (.htaccess)
Le script ajoute automatiquement :
- Routing React (SPA)
- Cache des fichiers statiques
- Compression gzip

## 🚨 Dépannage

### Erreur de Build
```bash
# Vérifier les dépendances
cd /app/frontend
npm install
npm run build
```

### Erreur d'Upload
```bash
# Vérifier les variables d'environnement
echo $HOSTPAPA_HOST
echo $HOSTPAPA_USER

# Tester la connexion FTP
lftp -u $HOSTPAPA_USER $HOSTPAPA_HOST
```

### Site ne charge pas
1. Vérifiez que les fichiers sont dans `public_html`
2. Vérifiez le fichier `.htaccess`
3. Consultez les logs d'erreur cPanel

## 📞 Support

En cas de problème :
1. Vérifiez les logs : `cat /app/deploy/*.log`
2. Consultez la documentation HostPapa
3. Contactez le support HostPapa pour les problèmes serveur

## 🔄 Mises à Jour

Pour mettre à jour le site :
```bash
# 1. Faire les modifications
# 2. Rebuild
./build-for-hostpapa.sh [shared|vps]

# 3. Upload
./hostpapa-upload.sh [shared|vps]
```

## 📱 Fonctionnalités Déployées

### Version Statique (Hébergement Partagé)
- ✅ Interface utilisateur complète
- ✅ Génération de projets (mockée)
- ✅ Éditeur de code
- ✅ Prévisualisation
- ✅ Navigation
- ⚠️ Données non persistantes

### Version Complète (VPS)
- ✅ Toutes les fonctionnalités statiques
- ✅ API backend
- ✅ Base de données
- ✅ Sauvegarde persistante
- ✅ Gestion utilisateurs (à implémenter)
