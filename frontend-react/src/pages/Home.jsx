import React from 'react';
import { ArrowRight, Globe, Zap, Lock, GitBranch, Terminal, Code2, Database, Cloud, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Gradient Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[20%] left-[50%] w-[600px] h-[600px] opacity-30 bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] left-[30%] w-[600px] h-[600px] opacity-20 bg-purple-500 rounded-full blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Navbar */}
        

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mt-[150px] mx-auto">
            <div className="mb-6 text-sm font-medium">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                DEPLOYMENT MADE SIMPLE
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Develop.<br className="md:hidden" />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Preview.
              </span>
              <br className="md:hidden" />Ship.
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              Experience the future of web deployment. Built for developers, trusted by enterprises.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
              <Link to={'/deploy'}>
              <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2 text-lg">
                Start Deploying <ArrowRight className="w-5 h-5" />
              </button>
              </Link>
              <button className="border border-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 transition text-lg">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-6 py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Everything you need to deploy
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}your next big idea
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Globe className="w-6 h-6" />}
              title="Global Edge Network"
              description="Deploy to 150+ data centers worldwide for optimal performance."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="Instant Deployments"
              description="Push to git and see your changes live in seconds, not minutes."
            />
            <FeatureCard 
              icon={<Lock className="w-6 h-6" />}
              title="Enterprise Security"
              description="Bank-grade security with SSL, DDOS protection, and more."
            />
            <FeatureCard 
              icon={<GitBranch className="w-6 h-6" />}
              title="Preview Deployments"
              description="Every branch gets its own preview deployment automatically."
            />
            <FeatureCard 
              icon={<Code2 className="w-6 h-6" />}
              title="Framework Optimized"
              description="Built-in support for React, Next.js, Vue, and more."
            />
            <FeatureCard 
              icon={<Cloud className="w-6 h-6" />}
              title="Serverless Functions"
              description="Deploy backend APIs with zero configuration."
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-y border-gray-800 bg-gradient-to-r from-gray-900 to-black py-24 mt-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12 md:gap-8">
              <StatCard 
                number="99.99%" 
                label="Uptime SLA"
                description="Industry-leading reliability"
              />
              <StatCard 
                number="150+" 
                label="Edge Locations"
                description="Global deployment network"
              />
              <StatCard 
                number="10M+" 
                label="Developers"
                description="Trust our platform daily"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-6 py-32 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Ready to deploy your
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}next project?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Join millions of developers and businesses who trust our platform for their mission-critical applications.
            </p>
            <Link to={'/deploy'}>
            <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center gap-2 mx-auto text-lg group">
              Deploy Now 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition bg-gray-900/50 backdrop-blur-sm group hover:-translate-y-1 duration-300">
    <div className="bg-blue-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const StatCard = ({ number, label, description }) => (
  <div className="text-center">
    <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
      {number}
    </div>
    <div className="text-xl font-semibold mb-2">{label}</div>
    <div className="text-gray-400">{description}</div>
  </div>
);


export default Home;