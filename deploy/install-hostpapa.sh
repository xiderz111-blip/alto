#!/bin/bash

# Script d'installation automatique pour HostPapa
echo "🏗️ Installation automatique Alt0 pour HostPapa"
echo "================================================"

# Fonction pour détecter le type d'hébergement
detect_hosting_type() {
    echo "🔍 Détection du type d'hébergement HostPapa..."
    
    # Vérifier si Node.js est disponible
    if command -v node >/dev/null 2>&1; then
        echo "✅ Node.js détecté - VPS/Serveur dédié"
        HOSTING_TYPE="vps"
    else
        echo "📄 Node.js non disponible - Hébergement partagé"
        HOSTING_TYPE="shared"
    fi
    
    echo "📋 Type d'hébergement: $HOSTING_TYPE"
}

# Installation pour hébergement partagé
install_shared() {
    echo "📦 Installation pour hébergement partagé..."
    
    # Build l'application
    ./build-for-hostpapa.sh shared
    
    echo "📋 Instructions pour hébergement partagé:"
    echo "1. Téléchargez le contenu de '/app/deploy/hostpapa-package/'"
    echo "2. Uploadez tous les fichiers dans votre dossier 'public_html' via cPanel"
    echo "3. Votre site sera disponible sur votre domaine"
    echo ""
    echo "📁 Fichiers à uploader:"
    ls -la /app/deploy/hostpapa-package/
}

# Installation pour VPS
install_vps() {
    echo "🖥️ Installation pour VPS..."
    
    # Build l'application complète
    ./build-for-hostpapa.sh vps
    
    echo "📋 Instructions pour VPS:"
    echo "1. Transférez le dossier '/app/deploy/hostpapa-vps-package/' sur votre VPS"
    echo "2. Exécutez './start.sh' dans le dossier"
    echo "3. Configurez votre domaine pour pointer vers le port 3000 (frontend)"
    echo ""
    echo "🔧 Commandes à exécuter sur le VPS:"
    echo "   cd hostpapa-vps-package"
    echo "   chmod +x start.sh"
    echo "   ./start.sh"
}

# Configuration automatique des variables d'environnement
configure_env() {
    echo "⚙️ Configuration des variables d'environnement..."
    
    read -p "Entrez votre domaine HostPapa (ex: monsite.com): " DOMAIN
    read -p "Entrez votre nom d'utilisateur FTP HostPapa: " FTP_USER
    read -s -p "Entrez votre mot de passe FTP HostPapa: " FTP_PASS
    echo ""
    
    # Créer le fichier d'environnement
    cat > /app/deploy/.env.hostpapa << EOF
# Configuration HostPapa
HOSTPAPA_HOST=$DOMAIN
HOSTPAPA_USER=$FTP_USER
HOSTPAPA_PASS=$FTP_PASS
REACT_APP_BACKEND_URL=https://$DOMAIN
NODE_ENV=production
EOF
    
    echo "✅ Configuration sauvegardée dans .env.hostpapa"
}

# Upload automatique
auto_upload() {
    echo "📤 Lancement de l'upload automatique..."
    
    if [ -f "/app/deploy/.env.hostpapa" ]; then
        source /app/deploy/.env.hostpapa
        ./hostpapa-upload.sh $HOSTING_TYPE
    else
        echo "❌ Fichier de configuration manquant. Exécutez d'abord la configuration."
        configure_env
        auto_upload
    fi
}

# Menu principal
show_menu() {
    echo ""
    echo "🎛️ Menu d'installation HostPapa:"
    echo "1. Installation automatique complète"
    echo "2. Build seulement"
    echo "3. Configuration des variables d'environnement"
    echo "4. Upload vers HostPapa"
    echo "5. Quitter"
    echo ""
    read -p "Choisissez une option (1-5): " choice
    
    case $choice in
        1)
            detect_hosting_type
            if [ "$HOSTING_TYPE" = "shared" ]; then
                install_shared
            else
                install_vps
            fi
            configure_env
            auto_upload
            ;;
        2)
            detect_hosting_type
            if [ "$HOSTING_TYPE" = "shared" ]; then
                install_shared
            else
                install_vps
            fi
            ;;
        3)
            configure_env
            ;;
        4)
            detect_hosting_type
            auto_upload
            ;;
        5)
            echo "👋 Au revoir!"
            exit 0
            ;;
        *)
            echo "❌ Option invalide"
            show_menu
            ;;
    esac
}

# Vérifier les dépendances
check_dependencies() {
    echo "🔍 Vérification des dépendances..."
    
    # Vérifier si lftp est installé (pour FTP)
    if ! command -v lftp >/dev/null 2>&1; then
        echo "📦 Installation de lftp..."
        if command -v apt-get >/dev/null 2>&1; then
            sudo apt-get update && sudo apt-get install -y lftp
        elif command -v yum >/dev/null 2>&1; then
            sudo yum install -y lftp
        else
            echo "⚠️ Veuillez installer lftp manuellement pour l'upload FTP"
        fi
    fi
    
    echo "✅ Dépendances vérifiées"
}

# Script principal
main() {
    check_dependencies
    show_menu
}

# Lancer le script
main