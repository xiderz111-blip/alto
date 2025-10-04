#!/bin/bash

# Script d'upload automatique vers HostPapa via FTP/SFTP
echo "📤 Upload vers HostPapa..."

# Variables à configurer
HOSTPAPA_HOST="${HOSTPAPA_HOST}"
HOSTPAPA_USER="${HOSTPAPA_USER}"
HOSTPAPA_PASS="${HOSTPAPA_PASS}"
REMOTE_PATH="public_html"

if [ -z "$HOSTPAPA_HOST" ] || [ -z "$HOSTPAPA_USER" ]; then
    echo "❌ Variables d'environnement manquantes:"
    echo "   HOSTPAPA_HOST - Votre domaine ou IP"
    echo "   HOSTPAPA_USER - Votre nom d'utilisateur FTP"
    echo "   HOSTPAPA_PASS - Votre mot de passe FTP"
    echo ""
    echo "Configurez-les avec:"
    echo "export HOSTPAPA_HOST='votredomaine.com'"
    echo "export HOSTPAPA_USER='votre_username'"
    echo "export HOSTPAPA_PASS='votre_password'"
    exit 1
fi

# Fonction d'upload FTP
upload_ftp() {
    echo "🔄 Upload via FTP..."
    
    if [ "$1" = "shared" ]; then
        LOCAL_PATH="/app/deploy/hostpapa-package"
    else
        LOCAL_PATH="/app/deploy/hostpapa-vps-package"
    fi
    
    # Utiliser lftp pour l'upload
    lftp -c "
        set ftp:ssl-allow no
        set ftp:passive-mode on
        open ftp://$HOSTPAPA_USER:$HOSTPAPA_PASS@$HOSTPAPA_HOST
        lcd $LOCAL_PATH
        cd $REMOTE_PATH
        mirror --reverse --delete --verbose
        quit
    "
    
    if [ $? -eq 0 ]; then
        echo "✅ Upload terminé avec succès!"
        echo "🌐 Votre site est maintenant disponible sur: https://$HOSTPAPA_HOST"
    else
        echo "❌ Erreur lors de l'upload"
        exit 1
    fi
}

# Fonction d'upload SFTP (plus sécurisé)
upload_sftp() {
    echo "🔐 Upload via SFTP..."
    
    if [ "$1" = "shared" ]; then
        LOCAL_PATH="/app/deploy/hostpapa-package"
    else
        LOCAL_PATH="/app/deploy/hostpapa-vps-package"
    fi
    
    # Utiliser rsync via SSH si disponible
    rsync -avz --delete $LOCAL_PATH/ $HOSTPAPA_USER@$HOSTPAPA_HOST:$REMOTE_PATH/
    
    if [ $? -eq 0 ]; then
        echo "✅ Upload SFTP terminé avec succès!"
        echo "🌐 Votre site est maintenant disponible sur: https://$HOSTPAPA_HOST"
    else
        echo "❌ Erreur lors de l'upload SFTP, tentative FTP..."
        upload_ftp $1
    fi
}

# Détecter le type d'upload
if [ "$2" = "sftp" ]; then
    upload_sftp $1
else
    upload_ftp $1
fi