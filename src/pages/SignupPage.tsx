import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Command, ArrowRight, Loader2, UserCircle, ShieldCheck, Zap, Target, Star, Globe, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole } from '../types';

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
        setError('This identity is already synchronized with SyncPro.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred during account initialization.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col md:flex-row font-sans text-slate-900 overflow-hidden">
      {/* Left Column: Brand Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-600/10 via-transparent to-violet-500/10"></div>
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-16 group">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-brand-600 transition-colors shadow-2xl">
              <Command className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">SyncPro</span>
          </Link>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight leading-[0.95] mb-10 italic">
            Command Your <br/> Mission.
          </h2>
          
          <div className="space-y-6">
            {[
              { icon: Zap, text: 'State synchronization' },
              { icon: Target, text: 'Backlog management' },
              { icon: Star, text: 'Performance scoring' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-slate-400">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center border border-white/5">
                  <item.icon className="w-4 h-4 text-brand-400" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-10 border-t border-white/5">
           <div className="flex -space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map(i => (
                <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} className="w-8 h-8 rounded-lg border-2 border-slate-900" alt="user" />
              ))}
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Join 10.2k Teams</p>
        </div>
      </div>

      {/* Right Column: Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight leading-none mb-2">Enlist Squad</h1>
            <p className="text-slate-400 font-medium font-sans text-sm leading-relaxed">Initialize your strategic dashboard.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 text-red-600 p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-red-100 flex items-center gap-2.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity</label>
                <input 
                  type="text" required
                  value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 h-11 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-semibold text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Channel</label>
                <input 
                  type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@syncpro.io"
                  className="w-full px-4 h-11 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-semibold text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Protocol</label>
              <input 
                type="password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Secure Access Key"
                className="w-full px-4 h-11 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-semibold text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Acknowledge Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('MEMBER')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border border-2 transition-all ${
                    role === 'MEMBER' 
                      ? "bg-slate-900 border-slate-900 text-white" 
                      : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                  }`}
                >
                  <UserCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Squad Mem.</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('ADMIN')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border border-2 transition-all ${
                    role === 'ADMIN' 
                      ? "bg-slate-900 border-slate-900 text-white" 
                      : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Lead Admin</span>
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-11 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.98] transition-all group disabled:opacity-70 mt-2"
            >
              Initialize Command <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-xs font-bold text-slate-400 tracking-wider">
            Identity Exists? {' '}
            <Link to="/login" className="text-brand-600 font-black hover:text-brand-700 transition-colors">
              Engage Login
            </Link>
          </p>

          <p className="mt-12 text-center text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed max-w-[240px] mx-auto">
            By engaging, you authorize SyncPro to synchronize your tactical data.
          </p>
        </div>
      </div>
    </div>
  );
}
