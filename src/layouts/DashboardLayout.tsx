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
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
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
        className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out hidden lg:flex flex-col"
      >
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 rotate-3 transform">
              <Command className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-white leading-tight">SyncPro</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Workspace</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          <div className="mb-6">
            <p className="px-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Main Menu</p>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative ${
                    isActive 
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="flex-1 font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="active-highlight"
                      className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div>
            <p className="px-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Organization</p>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all">
              <Settings className="w-5 h-5 text-slate-500" />
              <span className="font-medium">Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all">
              <HelpCircle className="w-5 h-5 text-slate-500" />
              <span className="font-medium">Support</span>
            </button>
          </div>
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <img 
                  src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                  alt={user?.name}
                  className="w-10 h-10 rounded-full border-2 border-slate-700 object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-800 rounded-full"></span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-red-600 text-slate-200 hover:text-white rounded-xl transition-all text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
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
                <h1 className="font-display font-bold text-xl text-white">SyncPro</h1>
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
        <header className={`h-20 flex items-center justify-between px-4 md:px-8 z-30 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60' : 'bg-transparent'}`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-xl lg:hidden text-slate-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden sm:flex items-center text-sm font-medium">
              <div className="flex items-center text-slate-400">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                <span>Overview</span>
              </div>
              <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
              <span className="text-slate-900 font-semibold">{activePage.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-slate-100/50 border border-slate-200/60 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:bg-white focus:border-brand-500 w-64 lg:w-96 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 border border-slate-200 px-1.5 py-0.5 rounded bg-white text-[10px] text-slate-400 font-bold">
                <span className="mt-0.5">⌘</span>
                <span>K</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 hover:bg-slate-100 rounded-xl relative text-slate-500 transition-all active:scale-95 group">
                <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
              </button>
              
              <div className="hidden lg:block w-px h-8 bg-slate-200/60 mx-1"></div>
              
              <button 
                onClick={() => navigate('/tasks')}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/10 transition-all active:scale-95 text-sm font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>Create Post</span>
              </button>

              <div className="lg:hidden flex items-center">
                <img 
                  src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                  alt={user?.name}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div 
          id="main-content"
          className="flex-1 overflow-y-auto overflow-x-hidden"
        >
          <div className="max-w-[1400px] mx-auto p-4 md:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
