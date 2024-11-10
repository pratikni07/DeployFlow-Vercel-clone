import React, { useEffect, useState } from 'react';
import { ArrowRight, Github, CircleUser, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : ''}`}>
    <div className="container mx-auto px-6">
      <div className="flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center">
          <Link to={'/'}>
          <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            DeployFlow
          </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink>Features</NavLink>
          <NavLink>Templates</NavLink>
          <NavLink>Documentation</NavLink>
          <NavLink>Enterprise</NavLink>
          <NavLink>Pricing</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition">
            <Github className="w-5 h-5" />
            Login with Github
          </button>
          <button className="hidden md:flex bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
            Start Free
          </button>
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>
  );
};


const NavLink = ({ children }) => (
    <a href="#" className="text-gray-400 hover:text-white transition text-sm">
      {children}
    </a>
  );

export default Navbar;