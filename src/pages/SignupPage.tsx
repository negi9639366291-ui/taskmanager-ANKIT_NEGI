import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Command, ArrowRight, Loader2, UserCircle, ShieldCheck, Zap, Target, Star, Globe, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole } from '../types';
import { Avatar } from '../components/Avatar';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('MEMBER');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Operational requirement: Password must be at least 6 characters.');
      setIsLoading(false);
      return;
    }

    try {
      const success = await signup({ name, email, password, role });
      if (success) {
        navigate('/dashboard');
      } else {
        setError('This identity is already synchronized with Task Manager.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred during account initialization.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] flex flex-col md:flex-row font-sans text-slate-400 overflow-hidden">
      {/* Left Column: Brand Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-black p-16 flex-col justify-between relative overflow-hidden border-r border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.05),transparent_70%)]"></div>
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-24 group">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover:bg-brand-500 transition-all">
              <Command className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white leading-none">Task Manager</span>
          </Link>
          
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter leading-[0.9] mb-12 italic">
            Command Your <br/> Mission.
          </h2>
          
          <div className="space-y-10">
            {[
              { icon: Zap, text: 'Real-time synchronization' },
              { icon: Target, text: 'High-fidelity backlog control' },
              { icon: Star, text: 'Performance score analytics' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5 text-slate-500 group">
                <div className="w-10 h-10 bg-white/[0.02] rounded-xl flex items-center justify-center border border-white/[0.05] group-hover:border-brand-500/50 transition-colors">
                  <item.icon className="w-5 h-5 text-brand-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-12 border-t border-white/[0.05]">
           <div className="flex -space-x-3 mb-6">
              {['Erik', 'Fiona', 'George', 'Hannah', 'Ian'].map(name => (
                <Avatar key={name} name={name} size="sm" className="border-2 border-black" />
              ))}
            </div>
            <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">Operational across 10.2k Global Teams</p>
        </div>
      </div>

      {/* Right Column: Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative overflow-y-auto bg-[#0B0B0F]">
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <h1 className="text-3xl font-display font-bold text-white tracking-tighter leading-none mb-3">Enlist Squad</h1>
            <p className="text-slate-600 font-bold uppercase tracking-[0.2em] text-[10px]">Initialize your tactical strategic nexus</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-500/5 text-rose-500 p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-rose-500/20 flex items-center gap-2.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Identity</label>
                <input 
                  type="text" required
                  value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="FULL NAME"
                  className="w-full px-4 h-12 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white/[0.04] transition-all font-bold text-xs text-white placeholder:text-slate-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Secure Channel</label>
                <input 
                  type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL@NEXUS.IO"
                  className="w-full px-4 h-12 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white/[0.04] transition-all font-bold text-xs text-white placeholder:text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Authorization Cipher</label>
              <input 
                type="password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 h-12 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white/[0.04] transition-all font-bold text-xs text-white placeholder:text-slate-800"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Designate Role</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('MEMBER')}
                  className={`flex items-center justify-center gap-3 p-4 rounded-xl border border-2 transition-all ${
                    role === 'MEMBER' 
                      ? "bg-brand-600 border-brand-600 text-white shadow-xl shadow-brand-500/20" 
                      : "bg-white/[0.01] border-white/[0.05] text-slate-600 hover:border-white/[0.1] hover:text-slate-400"
                  }`}
                >
                  <UserCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Squad.</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('ADMIN')}
                  className={`flex items-center justify-center gap-3 p-4 rounded-xl border border-2 transition-all ${
                    role === 'ADMIN' 
                      ? "bg-brand-600 border-brand-600 text-white shadow-xl shadow-brand-500/20" 
                      : "bg-white/[0.01] border-white/[0.05] text-slate-600 hover:border-white/[0.1] hover:text-slate-400"
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Admin.</span>
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl active:scale-[0.98] transition-all group disabled:opacity-70 mt-4"
            >
              Initialize Command <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-10 text-center text-[10px] font-bold text-slate-700 uppercase tracking-[0.1em]">
            Identity Exists? {' '}
            <Link to="/login" className="text-brand-400 font-black hover:text-white transition-colors">
              ENGAGE LOGIN
            </Link>
          </p>

          <p className="mt-16 text-center text-[8px] text-slate-800 font-bold uppercase tracking-[0.4em] leading-relaxed max-w-[280px] mx-auto">
            By engaging, you authorize Task Manager to synchronize your tactical deployment data.
          </p>
        </div>
      </div>
    </div>
  );
}
