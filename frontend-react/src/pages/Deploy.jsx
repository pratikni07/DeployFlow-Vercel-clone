import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { io } from 'socket.io-client';

const Deploy = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    githubUrl: ''
  });
  const [deploymentStatus, setDeploymentStatus] = useState('idle'); // idle, deploying, success, error
  const [deploymentLogs, setDeploymentLogs] = useState([]);
  const [accessUrl, setAccessUrl] = useState('');
  const [error, setError] = useState('');

  // Initialize socket connection
  useEffect(() => {
    const socket = io('http://localhost:9002');
    
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('message', (message) => {
      setDeploymentLogs(prev => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDeploymentStatus('deploying');
    setDeploymentLogs([]);
    setError('');

    try {
      const response = await fetch('http://localhost:9000/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gitURL: formData.githubUrl,
          slug: formData.projectName.toLowerCase().replace(/\s+/g, '-')
        }),
      });

      const data = await response.json();

      if (data.status === 'queued') {
        setAccessUrl(data.data.url);
        // Subscribe to deployment logs
        const socket = io('http://localhost:9002');
        socket.emit('subscribe', `logs:${data.data.projectSlug}`);
        setDeploymentStatus('success');
      } else {
        setDeploymentStatus('error');
        setError('Deployment failed to queue');
      }
    } catch (err) {
      setDeploymentStatus('error');
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px]" />
        <div className="absolute top-60 -left-40 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <div className="relative pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="container mx-auto px-6">
          {/* Deploy Form */}
          <div className="flex justify-center">
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6">Deploy Your Project</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-400">
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter your project name"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="githubUrl" className="block mb-2 text-sm font-medium text-gray-400">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter your GitHub repository URL"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={deploymentStatus === 'deploying'}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deploymentStatus === 'deploying' ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Deploying...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Deploy <ArrowRight className="ml-2" size={16} />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Deployment Preview */}
          {(deploymentStatus !== 'idle' || deploymentLogs.length > 0) && (
            <div className="max-w-4xl mx-auto mt-20 rounded-xl border border-gray-800 bg-black/50 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-400 border-b border-gray-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 font-mono">Deployment Status</span>
              </div>
              <div className="font-mono text-sm">
                {deploymentLogs.map((log, index) => (
                  <p key={index} className="text-gray-200 mt-1">{log}</p>
                ))}
                
                {deploymentStatus === 'deploying' && (
                  <div className="flex items-center gap-2 text-gray-200 mt-2">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                    Deploying to production...
                  </div>
                )}
                
                {deploymentStatus === 'success' && (
                  <div className="mt-4">
                    <p className="text-green-400">✓ Deployment successful!</p>
                    <p className="text-gray-200 mt-2">
                      Your project is live at: <a href={accessUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{accessUrl}</a>
                    </p>
                  </div>
                )}
                
                {deploymentStatus === 'error' && (
                  <p className="text-red-400 mt-2">❌ Error: {error}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deploy;