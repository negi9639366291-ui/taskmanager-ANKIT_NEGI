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
    <div className="min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md mt-[-5vh] z-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover:bg-brand-500 transition-all">
              <Command className="text-white w-5 h-5 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">Task Manager</span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-white tracking-tighter leading-none mb-3">Initialize Connection</h1>
          <p className="text-slate-600 font-bold uppercase tracking-widest text-[9px]">Resume command over mission trajectory</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-dark-card/40 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl border border-white/[0.03] relative overflow-hidden"
        >
          {/* Form Header Accent */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-600 to-indigo-600 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-500/5 text-rose-500 p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-rose-500/20 flex items-center gap-2.5"
                >
                  <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Identity Protocol (Email)</label>
              <div className="relative group">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@nexus.io"
                  className="w-full pl-4 pr-10 h-12 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white/[0.04] transition-all font-bold text-xs text-white placeholder:text-slate-700"
                />
                <Globe className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 group-focus-within:text-brand-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Access Cipher</label>
                <button type="button" className="text-[9px] font-bold text-brand-500 hover:text-brand-400 tracking-wider">RECOVERY?</button>
              </div>
              <div className="relative group">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-12 h-12 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white/[0.04] transition-all font-bold text-xs text-white placeholder:text-slate-700"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-700 hover:text-slate-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-brand-600 group relative text-white h-12 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-brand-500 transition-all shadow-xl active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <span className="flex items-center gap-3">
                  ENGAGE WORKSPACE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/[0.03] text-center">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.1em]">
              New Recruit? {' '}
              <Link to="/signup" className="text-brand-400 font-black hover:text-white transition-colors">
                REGISTER SQUAD
              </Link>
            </p>
          </div>
        </motion.div>
        
        {/* Verification Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-20 transition-all hover:opacity-40">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white leading-none">Security Level Omega</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white leading-none">AI Powered Ops</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-white" />
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white leading-none">Global Nexus Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
}
