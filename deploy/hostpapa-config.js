// Configuration de déploiement pour HostPapa
const config = {
  // Configuration pour hébergement partagé HostPapa
  shared: {
    buildPath: './build',
    uploadPath: 'public_html',
    nodeSupport: false, // Hébergement partagé standard
    deployment: 'static'
  },
  
  // Configuration pour VPS/serveur dédié HostPapa
  vps: {
    nodeSupport: true,
    mongoSupport: true,
    deployment: 'fullstack',
    ports: {
      frontend: 3000,
      backend: 8001
    }
  },
  
  // Variables d'environnement pour production
  env: {
    REACT_APP_BACKEND_URL: process.env.HOSTPAPA_DOMAIN || 'https://votredomaine.com',
    MONGO_URL: process.env.HOSTPAPA_MONGO_URL || 'mongodb://localhost:27017/alt0',
    NODE_ENV: 'production'
  }
};

module.exports = config;