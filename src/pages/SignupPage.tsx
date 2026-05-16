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
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 p-20 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-600/20 via-transparent to-violet-500/20"></div>
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-20 group">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-brand-600 transition-colors shadow-2xl">
              <Command className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-black text-2xl tracking-tighter text-white uppercase">SyncPro</span>
          </Link>
          
          <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter leading-[0.9] mb-12 italic">
            Command Your <br/> Mission.
          </h2>
          
          <div className="space-y-8">
            {[
              { icon: Zap, text: 'Real-time state synchronization' },
              { icon: Target, text: 'Precision backlog management' },
              { icon: Star, text: 'Team performance scoring' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5 text-slate-300">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <item.icon className="w-5 h-5 text-brand-400" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-20 border-t border-white/5">
           <div className="flex -space-x-3 mb-6">
              {[1, 2, 3, 4, 5].map(i => (
                <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} className="w-10 h-10 rounded-xl border-4 border-slate-900" alt="user" />
              ))}
            </div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Join 10.2k Scaling Tech Teams</p>
        </div>
      </div>

      {/* Right Column: Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 relative">
        <div className="w-full max-w-lg">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight leading-none mb-3">Enlist Squad</h1>
            <p className="text-slate-500 font-medium font-sans">Initialize your strategic dashboard in seconds.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 text-red-600 p-5 rounded-2xl text-xs font-black uppercase tracking-widest border border-red-100 flex items-center gap-3"
                >
                  <Lock className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Identity Display</label>
                <input 
                  type="text" required
                  value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-bold text-slate-700"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Comm Channel</label>
                <input 
                  type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@syncpro.io"
                  className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Access Protocol (Password)</label>
              <input 
                type="password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Secure Access Key"
                className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-bold text-slate-700"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Acknowledge Role</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('MEMBER')}
                  className={`flex items-center justify-center gap-3 p-5 rounded-[1.5rem] border-2 transition-all group ${
                    role === 'MEMBER' 
                      ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/10" 
                      : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                  }`}
                >
                  <UserCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Squad Mem.</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('ADMIN')}
                  className={`flex items-center justify-center gap-3 p-5 rounded-[1.5rem] border-2 transition-all group ${
                    role === 'ADMIN' 
                      ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/10" 
                      : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Lead Admin</span>
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-6 bg-brand-600 hover:bg-brand-700 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-brand-500/20 active:scale-[0.98] transition-all group disabled:opacity-70 mt-4"
            >
              Initialize Command <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-10 text-center text-sm font-bold text-slate-400 uppercase tracking-widest">
            Identity Exists? {' '}
            <Link to="/login" className="text-brand-600 font-black hover:text-brand-700 transition-colors">
              Engage Login
            </Link>
          </p>

          <p className="mt-20 text-center text-[9px] text-slate-300 font-extrabold uppercase tracking-[0.3em] leading-loose max-w-xs mx-auto">
            By engaging, you authorize SyncPro to synchronize your tactical data.
          </p>
        </div>
      </div>
    </div>
  );
}
