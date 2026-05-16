import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  BarChart3, 
  User, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  Search,
  ChevronRight,
  Plus,
  Settings,
  HelpCircle,
  Command
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

import { Avatar } from '../components/Avatar';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Briefcase, label: 'Projects', path: '/projects' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Users, label: 'Team', path: '/team' },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (e: any) => {
      setScrolled(e.target.scrollTop > 20);
    };
    const mainEl = document.getElementById('main-content');
    mainEl?.addEventListener('scroll', handleScroll);
    return () => mainEl?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const activePage = navItems.find(item => item.path === location.pathname) || { label: 'Dashboard' };

  return (
    <div className="flex h-screen bg-dark-bg overflow-hidden font-sans dashboard-dark">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className="fixed inset-y-0 left-0 z-50 w-64 bg-[#08080C] border-r border-white/5 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out hidden lg:flex flex-col shadow-2xl"
      >
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-10 h-10 bg-brand-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:scale-110 transition-all group-hover:rotate-6">
              <Command className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-black text-xl text-white leading-none tracking-tighter italic">VECTA</h1>
              <p className="text-[8px] text-slate-700 uppercase tracking-[0.3em] font-black mt-1">Intelligence v1.0</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
          <div>
            <p className="px-4 text-[9px] font-black text-slate-800 uppercase tracking-[0.4em] mb-4 italic">Core Matrix</p>
            <div className="space-y-1.5 text-slate-400">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 relative ${
                      isActive 
                        ? 'bg-white/[0.03] text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] border border-white/[0.05]' 
                        : 'hover:text-slate-200 hover:bg-white/[0.02]'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 transition-all ${isActive ? 'text-brand-500 scale-110' : 'text-slate-700 group-hover:text-slate-400'}`} />
                    <span className={`flex-1 font-black text-[10px] uppercase tracking-widest ${isActive ? 'translate-x-0.5 transition-transform' : ''}`}>{item.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-indicator-side"
                        className="absolute left-0 w-1 h-4 bg-brand-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="px-4 text-[9px] font-black text-slate-800 uppercase tracking-[0.4em] mb-4 italic">Operational Hub</p>
            <div className="space-y-1.5">
              <button 
                onClick={() => navigate('/profile')}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.02] rounded-xl transition-all group"
              >
                <Settings className="w-4 h-4 text-slate-700 group-hover:text-slate-400 transition-colors" />
                <span className="font-black text-[10px] uppercase tracking-widest">Protocols</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.02] rounded-xl transition-all group">
                <HelpCircle className="w-4 h-4 text-slate-700 group-hover:text-slate-400 transition-colors" />
                <span className="font-black text-[10px] uppercase tracking-widest">Base Intel</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-white/[0.02] rounded-2xl p-4 border border-white/[0.03] shadow-inner">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative group cursor-pointer" onClick={() => navigate('/profile')}>
                <Avatar name={user?.name} size="sm" className="rounded-xl border border-white/10 group-hover:scale-105 transition-transform" />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#0B0B0F] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              </div>
              <div className="flex-1 overflow-hidden" onClick={() => navigate('/profile')}>
                <p className="text-[10px] font-black text-white truncate uppercase tracking-tight leading-none mb-1 cursor-pointer">{user?.name}</p>
                <p className="text-[9px] text-slate-700 truncate font-bold cursor-pointer group-hover:text-slate-500 transition-colors uppercase tracking-widest">{user?.role}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 text-slate-700 rounded-xl transition-all text-[9px] font-black uppercase tracking-[0.2em] group"
            >
              <LogOut className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Terminate Session</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 md:hidden flex flex-col"
          >
            <div className="p-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 rotate-3 transform">
                  <Command className="w-6 h-6 text-white" />
                </div>
                <h1 className="font-display font-bold text-xl text-white">Task Manager</h1>
              </div>
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    location.pathname === item.path 
                      ? 'bg-brand-600 text-white' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-base">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-800/50">
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="flex items-center gap-3 px-4 py-4 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-base">Log out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Navbar */}
        <header className={`h-20 flex items-center justify-between px-6 md:px-10 z-30 transition-all duration-300 ${scrolled ? 'bg-[#0B0B0F]/90 backdrop-blur-xl shadow-2xl border-b border-white/5' : 'bg-transparent'}`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="p-2 hover:bg-white/5 rounded-xl lg:hidden text-slate-400"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden sm:flex items-center text-[10px] font-black uppercase tracking-[0.2em]">
              <div className="flex items-center text-slate-700">
                <LayoutDashboard className="w-3.5 h-3.5 mr-2" />
                <span>Unified Matrix</span>
              </div>
              <ChevronRight className="w-3 h-3 mx-3 text-slate-800" />
              <span className="text-brand-500 italic">{activePage.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 group-focus-within:text-brand-500 transition-colors" />
              <input 
                type="text" 
                placeholder="SYSTEM SEARCH..." 
                className="bg-white/[0.03] border border-white/5 pl-11 pr-4 py-2.5 rounded-xl text-[10px] font-black tracking-widest focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:bg-white/[0.05] focus:border-white/10 w-48 lg:w-80 transition-all text-white placeholder:text-slate-800"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 border border-white/5 px-1.5 py-0.5 rounded-lg bg-black text-[8px] text-slate-700 font-black">
                <span>⌘</span>
                <span>K</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2.5 hover:bg-white/5 rounded-2xl relative text-slate-600 transition-all active:scale-95 group border border-transparent hover:border-white/5 shadow-2xl">
                <Bell className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-500 rounded-full border-2 border-[#0B0B0F] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
              </button>
              
              <div className="hidden lg:block w-px h-8 bg-white/5 mx-2"></div>
              
              <button 
                onClick={() => navigate('/tasks')}
                className="hidden sm:flex items-center gap-2.5 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-[0_10px_20px_rgba(99,102,241,0.2)] transition-all active:scale-95 text-[10px] font-black uppercase tracking-[0.2em] border border-white/5"
              >
                <Plus className="w-4 h-4" />
                <span>Initialize Node</span>
              </button>

              <div className="lg:hidden flex items-center cursor-pointer" onClick={() => navigate('/profile')}>
                <Avatar name={user?.name} size="sm" className="rounded-xl border border-white/5" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div 
          id="main-content"
          className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar"
        >
          <div className="max-w-[1400px] mx-auto p-6 md:p-10 lg:p-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
