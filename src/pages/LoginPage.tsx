import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Command, ArrowRight, Eye, EyeOff, Loader2, Sparkles, Shield, Lock, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('The team credentials provided do not match our records.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('A transmission error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-md mt-[-5vh]">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10 group-hover:bg-brand-600 transition-colors">
              <Command className="text-white w-5 h-5 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">Task Manager</span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight leading-none mb-3">Initialize Session</h1>
          <p className="text-slate-400 font-medium font-sans text-sm">Resume command over mission trajectory.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_20px_60px_-20px_rgba(30,27,75,0.08)] border border-slate-200/60 relative overflow-hidden"
        >
          {/* Form Header Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-indigo-600" />
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 text-red-600 p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-red-100 flex items-center gap-2.5"
                >
                  <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity (Email)</label>
              <div className="relative group">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@taskmanager.io"
                  className="w-full pl-4 pr-10 h-12 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-semibold text-sm text-slate-700 placeholder:text-slate-400"
                />
                <Globe className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Access Code</label>
                <button type="button" className="text-[9px] font-bold text-brand-600 hover:text-brand-700 tracking-wider">Recovery?</button>
              </div>
              <div className="relative group">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mission critical password"
                  className="w-full pl-4 pr-12 h-12 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-semibold text-sm text-slate-700 placeholder:text-slate-400"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 group relative text-white h-12 rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2.5 hover:bg-brand-600 transition-all shadow-sm active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span className="flex items-center gap-2.5">
                  Engage Workspace <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs font-bold text-slate-400 tracking-wider">
              New Recruit? {' '}
              <Link to="/signup" className="text-brand-600 font-black hover:text-brand-700 transition-colors">
                Register Squad
              </Link>
            </p>
          </div>
        </motion.div>
        
        {/* Verification Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-30 grayscale transition-all">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-[9px] font-black uppercase tracking-widest leading-none">Vault Security</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[9px] font-black uppercase tracking-widest leading-none">AI Synthesis</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span className="text-[9px] font-black uppercase tracking-widest leading-none">Global Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
}
