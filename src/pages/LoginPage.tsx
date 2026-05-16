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

      <div className="w-full max-w-xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="w-12 h-12 bg-slate-900 rounded-[1.25rem] flex items-center justify-center shadow-2xl shadow-slate-900/10 group-hover:bg-brand-600 transition-colors">
              <Command className="text-white w-6 h-6 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="font-display font-black text-2xl tracking-tighter text-slate-900 uppercase">SyncPro</span>
          </Link>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight leading-none mb-4">Initialize Session</h1>
          <p className="text-slate-500 font-medium font-sans">Resume command over your team's mission trajectory.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 md:p-14 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(30,27,75,0.08)] border border-slate-200/60 relative overflow-hidden"
        >
          {/* Form Header Accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-500 to-indigo-600" />
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 text-red-600 p-5 rounded-2xl text-xs font-black uppercase tracking-widest border border-red-100 flex items-center gap-3"
                >
                  <Lock className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Team Identity (Email)</label>
              <div className="relative group">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@syncpro.io"
                  className="w-full pl-6 pr-4 py-5 bg-slate-50/50 border border-slate-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-400"
                />
                <Globe className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Authorized Access Code</label>
                <button type="button" className="text-[10px] font-black text-brand-600 hover:text-brand-700 uppercase tracking-widest">Recovery?</button>
              </div>
              <div className="relative group">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mission critical password"
                  className="w-full pl-6 pr-14 py-5 bg-slate-50/50 border border-slate-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-400"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 group relative text-white py-6 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-brand-600 transition-all shadow-[0_20px_50px_rgba(30,27,75,0.15)] active:scale-[0.98] disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <span className="flex items-center gap-3">
                  Engage Workspace <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-14 pt-10 border-t border-slate-100 text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              New Recruit? {' '}
              <Link to="/signup" className="text-brand-600 font-black hover:text-brand-700 transition-colors">
                Register Squad
              </Link>
            </p>
          </div>
        </motion.div>
        
        {/* Verification Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Vault Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">AI Synthesis</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Global Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
}
