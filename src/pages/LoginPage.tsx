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
          <Link to="/" className="inline-flex items-center gap-4 mb-10 group">
            <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:bg-brand-500 transition-all group-hover:rotate-6">
              <Command className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-display font-black text-2xl tracking-tighter text-white leading-none italic uppercase">Task Manager</span>
              <span className="text-[7px] text-slate-700 uppercase tracking-[0.4em] font-black mt-1">Intelligence Protocol</span>
            </div>
          </Link>
          <h1 className="text-3xl font-display font-black text-white tracking-tighter leading-none mb-4 italic uppercase">Initialize Connection</h1>
          <p className="text-slate-700 font-bold uppercase tracking-[0.3em] text-[9px]">Resume command over operational trajectory</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.01] backdrop-blur-3xl p-10 md:p-12 rounded-[2.5rem] shadow-3xl border border-white/[0.03] relative overflow-hidden group"
        >
          {/* Form Header Accent */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-500/5 text-rose-500 p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-rose-500/10 flex items-center gap-3.5"
                >
                  <Lock className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] ml-1">Identity Cipher (Email)</label>
              <div className="relative group/input">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="AGENT@TASKMANAGER.IO"
                  className="w-full pl-5 pr-12 h-14 bg-white/[0.02] border border-white/[0.05] rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500/50 focus:bg-white/[0.04] transition-all font-black text-[11px] text-white placeholder:text-slate-800 tracking-[0.1em]"
                />
                <Globe className="absolute right-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-800 group-focus-within/input:text-brand-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">Access Key</label>
                <button type="button" className="text-[9px] font-black text-brand-500 hover:text-brand-400 tracking-[0.2em] uppercase">Recovery?</button>
              </div>
              <div className="relative group/input">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-5 pr-14 h-14 bg-white/[0.02] border border-white/[0.05] rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500/50 focus:bg-white/[0.04] transition-all font-black text-[11px] text-white placeholder:text-slate-800 tracking-[0.2em]"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 text-slate-800 hover:text-slate-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-brand-600 group relative text-white h-14 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-brand-500 transition-all shadow-[0_15px_30px_rgba(99,102,241,0.2)] active:scale-[0.98] disabled:opacity-70 border border-white/10"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                <span className="flex items-center gap-4">
                  Engage Workspace <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-white/[0.03] text-center">
            <p className="text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em]">
              New Operative? {' '}
              <Link to="/signup" className="text-brand-500 font-black hover:text-white transition-all underline underline-offset-4 decoration-current/30 hover:decoration-current">
                Register Unit
              </Link>
            </p>
          </div>
        </motion.div>
        
        {/* Verification Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-16 gap-y-8 opacity-10 transition-all hover:opacity-40">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-white" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white leading-none">Level Omega Encryption</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white leading-none">Neural Core v4.2</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-white" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white leading-none">Global Nexus Cluster</span>
          </div>
        </div>
      </div>
    </div>
  );
}
