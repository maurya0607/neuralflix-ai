import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiVideo, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMenuOpen(false)}>
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <FiVideo className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent tracking-tighter">
              VishwaNova
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-10">
            <Link 
              to="/" 
              className={`text-sm font-semibold tracking-wide transition-all duration-300 relative group ${location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Generate Trailer
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-500 transition-transform duration-300 ${location.pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-100'}`} />
            </Link>
          </div>

          {/* desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase tracking-tighter text-gray-500 font-bold">Director</span>
                  <span className="text-sm font-bold text-white uppercase tracking-wider">{user.name}</span>
                </div>
                <Link 
                  to="/dashboard"
                  className="text-xs font-black uppercase tracking-[0.2em] text-gray-300 hover:text-indigo-400 transition-all px-5 py-2 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 hover:border-indigo-500/30"
                >
                  Archives
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 hover:border-red-500/30 text-red-400 text-[10px] font-black transition-all group uppercase tracking-[0.2em]"
                >
                  <FiLogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-sm font-bold text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] active:scale-95"
                >
                  <FiUser className="w-4 h-4" />
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-400 hover:text-white focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="w-7 h-7" />
              ) : (
                <FiMenu className="w-7 h-7" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[80vh] opacity-100 py-8' : 'max-h-0 opacity-0 py-0'}`}
      >
        <div className="px-6 flex flex-col gap-6">
          <Link 
            to="/" 
            className={`text-lg font-bold ${location.pathname === '/' ? 'text-indigo-400' : 'text-white'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Generate Trailer
          </Link>
          
          <div className="h-[1px] bg-white/5 w-full" />

          {user ? (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Signed in as</p>
                  <p className="text-white font-bold">{user.name}</p>
                </div>
              </div>
              
              <Link 
                to="/dashboard"
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                My Archives
                <span className="text-indigo-400">→</span>
              </Link>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 text-red-400 font-bold p-2"
              >
                <FiLogOut />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link 
                to="/login"
                className="text-center p-4 rounded-2xl font-bold text-white border border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/signup"
                className="text-center p-4 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
