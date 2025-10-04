#!/bin/bash

# Script de build automatique pour HostPapa
echo "🚀 Démarrage du build pour HostPapa..."

# Vérifier le type d'hébergement
if [ "$1" = "shared" ]; then
    echo "📦 Build pour hébergement partagé HostPapa"
    
    # Build React pour production
    cd /app/frontend
    echo "🔨 Building React app..."
    npm run build
    
    # Créer le package de déploiement
    mkdir -p /app/deploy/hostpapa-package
    cp -r build/* /app/deploy/hostpapa-package/
    
    # Ajouter le fichier .htaccess pour le routing React
    cat > /app/deploy/hostpapa-package/.htaccess << 'EOF'
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]

# Cache statique
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Compression gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
EOF

    # Créer un fichier de configuration pour les mocks
    cat > /app/deploy/hostpapa-package/config.js << 'EOF'
// Configuration pour version statique (hébergement partagé)
window.APP_CONFIG = {
  apiUrl: '', // Pas d'API backend en mode statique
  staticMode: true,
  version: 'hostpapa-static'
};
EOF

    echo "✅ Build statique créé dans /app/deploy/hostpapa-package/"
    
elif [ "$1" = "vps" ]; then
    echo "🖥️ Build pour VPS HostPapa"
    
    # Build complet avec backend
    cd /app/frontend
    npm run build
    
    # Préparer le backend
    cd /app/backend
    pip freeze > requirements.txt
    
    # Créer le package complet
    mkdir -p /app/deploy/hostpapa-vps-package
    cp -r /app/frontend/build /app/deploy/hostpapa-vps-package/frontend
    cp -r /app/backend /app/deploy/hostpapa-vps-package/backend
    
    # Créer les scripts de démarrage
    cat > /app/deploy/hostpapa-vps-package/start.sh << 'EOF'
#!/bin/bash
# Script de démarrage pour VPS HostPapa

# Installer les dépendances Python
cd backend
pip install -r requirements.txt

# Démarrer le backend
nohup uvicorn server:app --host 0.0.0.0 --port 8001 > backend.log 2>&1 &

# Servir le frontend avec nginx ou serveur statique
echo "✅ Application démarrée"
echo "Frontend: http://your-domain.com"
echo "Backend: http://your-domain.com:8001"
EOF

    chmod +x /app/deploy/hostpapa-vps-package/start.sh
    
    echo "✅ Build VPS créé dans /app/deploy/hostpapa-vps-package/"
else
    echo "❌ Spécifiez le type: 'shared' ou 'vps'"
    echo "Usage: ./build-for-hostpapa.sh [shared|vps]"
    exit 1
fi

echo "🎉 Build terminé!"