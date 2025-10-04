export const generateMockProject = (prompt) => {
  const projectId = Math.random().toString(36).substr(2, 9);
  
  // Simple logic to determine project type based on prompt
  let projectType = 'web-app';
  let framework = 'React';
  let features = [];
  
  if (prompt.toLowerCase().includes('dashboard')) {
    projectType = 'dashboard';
    features = ['Analytics', 'Charts', 'User Management', 'Real-time Data'];
  } else if (prompt.toLowerCase().includes('e-commerce') || prompt.toLowerCase().includes('shop')) {
    projectType = 'e-commerce';
    features = ['Product Catalog', 'Shopping Cart', 'Payment Integration', 'User Authentication'];
  } else if (prompt.toLowerCase().includes('blog') || prompt.toLowerCase().includes('cms')) {
    projectType = 'blog';
    features = ['Content Management', 'Comments', 'SEO Optimization', 'User Profiles'];
  } else if (prompt.toLowerCase().includes('todo') || prompt.toLowerCase().includes('task')) {
    projectType = 'productivity';
    features = ['Task Management', 'Categories', 'Due Dates', 'Progress Tracking'];
  } else {
    features = ['Responsive Design', 'Interactive UI', 'Modern Styling', 'Performance Optimized'];
  }

  return {
    id: projectId,
    name: `Alt0 Project ${projectId}`,
    type: projectType,
    framework,
    features,
    prompt,
    createdAt: new Date().toISOString(),
    files: generateMockFiles(projectType),
    preview: generateMockPreview(projectType)
  };
};

const generateMockFiles = (projectType) => {
  const baseFiles = [
    {
      name: 'App.jsx',
      path: '/src/App.jsx',
      content: generateMockAppContent(projectType),
      language: 'javascript'
    },
    {
      name: 'index.html',
      path: '/index.html',
      content: generateMockHTMLContent(),
      language: 'html'
    },
    {
      name: 'styles.css',
      path: '/src/styles.css',
      content: generateMockCSSContent(projectType),
      language: 'css'
    },
    {
      name: 'package.json',
      path: '/package.json',
      content: generateMockPackageJson(),
      language: 'json'
    }
  ];

  if (projectType === 'dashboard') {
    baseFiles.push({
      name: 'Dashboard.jsx',
      path: '/src/components/Dashboard.jsx',
      content: generateMockDashboardContent(),
      language: 'javascript'
    });
  }

  return baseFiles;
};

const generateMockAppContent = (projectType) => {
  switch (projectType) {
    case 'dashboard':
      return `import React from 'react';
import Dashboard from './components/Dashboard';
import './styles.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Analytics Dashboard</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;`;
    
    case 'e-commerce':
      return `import React from 'react';
import ProductGrid from './components/ProductGrid';
import './styles.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>E-Commerce Store</h1>
        <nav>
          <a href="#">Products</a>
          <a href="#">Cart</a>
          <a href="#">Account</a>
        </nav>
      </header>
      <main>
        <ProductGrid />
      </main>
    </div>
  );
}

export default App;`;
    
    default:
      return `import React from 'react';
import './styles.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to your Alt0 App</h1>
        <p>Your application has been generated successfully!</p>
      </header>
      <main>
        <section className="hero">
          <h2>Ready to customize?</h2>
          <p>Start editing the code to make it your own.</p>
          <button className="cta-button">Get Started</button>
        </section>
      </main>
    </div>
  );
}

export default App;`;
  }
};

const generateMockHTMLContent = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alt0 Generated App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
};

const generateMockCSSContent = (projectType) => {
  return `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

main {
  flex: 1;
  padding: 2rem;
}

.hero {
  text-align: center;
  color: white;
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem 0;
}

.hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}`;
};

const generateMockDashboardContent = () => {
  return `import React from 'react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Users', value: '12,345', change: '+12%' },
    { label: 'Revenue', value: '$45,678', change: '+8%' },
    { label: 'Orders', value: '1,234', change: '+15%' },
    { label: 'Conversion', value: '3.4%', change: '+0.2%' }
  ];

  return (
    <div className="dashboard">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.label}</h3>
            <p className="stat-value">{stat.value}</p>
            <span className="stat-change positive">{stat.change}</span>
          </div>
        ))}
      </div>
      <div className="chart-container">
        <h3>Analytics Overview</h3>
        <div className="mock-chart">
          <p>Chart would be rendered here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;`;
};

const generateMockPackageJson = () => {
  return `{
  "name": "alt0-generated-app",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`;
};

const generateMockPreview = (projectType) => {
  // This would contain the HTML preview of the generated app
  return `<!DOCTYPE html>
<html>
<head>
  <title>Alt0 Preview</title>
  <style>
    body { font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .preview-container { padding: 2rem; color: white; text-align: center; }
  </style>
</head>
<body>
  <div class="preview-container">
    <h1>Your ${projectType} app is ready!</h1>
    <p>This is a preview of your generated application.</p>
  </div>
</body>
</html>`;
};

export const mockProjects = [
  {
    id: 'demo-1',
    name: 'E-commerce Dashboard',
    type: 'dashboard',
    framework: 'React',
    features: ['Analytics', 'Sales Charts', 'User Management'],
    createdAt: '2024-01-15T10:30:00Z',
    files: generateMockFiles('dashboard'),
    preview: generateMockPreview('dashboard')
  },
  {
    id: 'demo-2',
    name: 'Blog Platform',
    type: 'blog',
    framework: 'React',
    features: ['Content Management', 'Comments', 'SEO'],
    createdAt: '2024-01-14T15:45:00Z',
    files: generateMockFiles('blog'),
    preview: generateMockPreview('blog')
  },
  {
    id: 'demo-3',
    name: 'Task Manager',
    type: 'productivity',
    framework: 'React',
    features: ['Task Tracking', 'Categories', 'Due Dates'],
    createdAt: '2024-01-13T09:20:00Z',
    files: generateMockFiles('productivity'),
    preview: generateMockPreview('productivity')
  }
];