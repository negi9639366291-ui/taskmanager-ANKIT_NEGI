import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Shield, 
  Settings, 
  Bell, 
  Lock, 
  ExternalLink,
  Camera,
  CheckCircle2,
  Clock,
  Briefcase,
  Trophy,
  Activity,
  Globe,
  Plus,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { formatDate } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

import { Avatar } from '../components/Avatar';

export default function Profile() {
  const { user } = useAuth();
  const { tasks, projects } = useData();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SETTINGS' | 'SECURITY' | 'BILLING'>('OVERVIEW');
  
  const userTasks = tasks.filter(t => t.assignedTo === user?.id);
  const userProjects = projects.filter(p => p.members.includes(user?.id || ''));
  const completedTasks = userTasks.filter(t => t.status === 'COMPLETED');
  const productivity = userTasks.length > 0 ? Math.round((completedTasks.length / userTasks.length) * 100) : 0;

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-400">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight mb-1 italic">Operator Profile</h1>
          <p className="text-slate-600 font-bold max-w-md text-[10px] uppercase tracking-[0.2em] leading-relaxed">
            Manage your high-performance identity and tactical workspace settings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-9 px-4 bg-brand-600 hover:bg-brand-500 text-white font-black rounded-xl shadow-2xl shadow-brand-500/20 transition-all flex items-center gap-2 group active:scale-95 text-[10px] uppercase tracking-[0.2em] border border-white/5">
             <Settings className="w-3.5 h-3.5" />
             <span>Configure Unit</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Card Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.01] rounded-[2rem] p-8 border border-white/[0.03] shadow-3xl relative overflow-hidden group hover:bg-white/[0.02] transition-colors"
          >
            {/* Background Accent */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-[#0B0B0F] to-[#1a1a24] group-hover:to-brand-900/20 transition-all duration-700" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative mb-8 mt-4">
                <div className="w-24 h-24 rounded-3xl bg-black p-1 shadow-2xl border border-white/10 group-hover:scale-105 transition-transform">
                  <Avatar name={user?.name} size="xl" className="w-full h-full rounded-2xl" />
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-brand-600 rounded-xl shadow-2xl text-white border-4 border-black hover:bg-brand-500 transition-all active:scale-90">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <h2 className="text-2xl font-display font-bold text-white tracking-tighter mb-1">{user?.name}</h2>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mt-1 mb-8">{user?.role} — FIELD OPS</p>
              
              <div className="flex items-center gap-2 mb-10">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.2em]">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  Unit Active
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-6 border-t border-white/5 pt-8">
                <div className="text-center group/stat">
                  <p className="text-2xl font-display font-bold text-white group-hover:text-brand-400 transition-colors uppercase italic tracking-tighter">{userTasks.length}</p>
                  <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mt-1">Nodes</p>
                </div>
                <div className="text-center group/stat">
                  <p className="text-2xl font-display font-bold text-white group-hover:text-emerald-400 transition-colors uppercase italic tracking-tighter">{completedTasks.length}</p>
                  <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mt-1">Shipped</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.01] rounded-2xl p-6 border border-white/[0.03] shadow-xl backdrop-blur-sm"
          >
            <h3 className="text-[9px] font-black text-slate-800 uppercase tracking-[0.3em] mb-8">Metadata Intel</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center justify-center text-slate-700 group-hover:text-brand-400 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-800 uppercase tracking-widest mb-1 italic">Vocal Frequency</p>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center justify-center text-slate-700 group-hover:text-brand-400 transition-colors">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-800 uppercase tracking-widest mb-1 italic">Deployment Epoch</p>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">{formatDate(user?.joinedAt || new Date().toISOString())}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Tabs */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white/[0.01] rounded-[2rem] border border-white/[0.03] shadow-3xl overflow-hidden min-h-[550px] flex flex-col backdrop-blur-sm">
            <div className="flex items-center px-8 pt-4 border-b border-white/5 space-x-2">
              {[
                { id: 'OVERVIEW', label: 'Identity Matrix' },
                { id: 'SETTINGS', label: 'Tactical Protocols' },
                { id: 'SECURITY', label: 'Encrypted Vault' }
              ].map(tab => (
                 <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-5 text-[10px] font-black uppercase tracking-[0.25em] transition-all relative ${
                    activeTab === tab.id ? 'text-white' : 'text-slate-700 hover:text-slate-500'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTabProfile"
                      className="absolute bottom-0 left-6 right-6 h-1 bg-brand-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-8 md:p-12 flex-1">
              <AnimatePresence mode="wait">
                {activeTab === 'OVERVIEW' && (
                  <motion.div 
                    key="overview"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="space-y-12"
                  >
                    {/* Focus Metrics */}
                    <section>
                      <div className="flex items-center justify-between mb-8">
                        <div>
                           <h4 className="text-2xl font-display font-bold text-white tracking-tighter italic">Unit Efficiency Intel</h4>
                           <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] mt-2">Real-time performance telemetry</p>
                        </div>
                        <div className="p-3 bg-brand-500/10 rounded-2xl border border-brand-500/20">
                          <Activity className="w-6 h-6 text-brand-400" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] transition-all group shadow-xl">
                          <div className="flex items-center gap-5">
                             <div className="w-14 h-14 bg-black border border-white/5 rounded-2xl flex items-center justify-center shadow-2xl text-2xl font-display font-bold text-brand-500 italic tracking-tighter group-hover:scale-110 transition-transform">
                              {productivity}%
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em] mb-1.5">Force Velocity</p>
                              <p className="text-[11px] font-bold text-slate-500 leading-tight">Objective completion index.</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] transition-all group shadow-xl">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-black border border-white/5 rounded-2xl flex items-center justify-center shadow-2xl text-2xl font-display font-bold text-violet-400 italic tracking-tighter group-hover:scale-110 transition-transform">
                              8.4
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em] mb-1.5">Strategic Impact</p>
                              <p className="text-[11px] font-bold text-slate-500 leading-tight">Core squad contribution mass.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Quick Access */}
                    <section>
                      <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] mb-8">Active Strategic Operations</h4>
                      <div className="grid gap-4">
                        {userProjects.slice(0, 3).map((p, i) => (
                           <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/[0.03] hover:bg-white/[0.05] transition-all group shadow-lg">
                            <div className="flex items-center gap-5">
                              <div className="w-12 h-12 bg-black border border-white/5 rounded-2xl flex items-center justify-center shadow-2xl text-slate-700 group-hover:text-brand-400 transition-colors">
                                <Target className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-xs font-black text-white uppercase tracking-[0.1em] mb-1">{p.name}</p>
                                <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]">Linked Project Node</p>
                              </div>
                            </div>
                            <button className="w-10 h-10 bg-white/5 rounded-xl text-slate-700 hover:text-white hover:bg-brand-600 transition-all shadow-xl group-hover:translate-x-1">
                              <ArrowRight className="w-5 h-5 mx-auto" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>
                  </motion.div>
                )}

                {activeTab === 'SETTINGS' && (
                  <motion.div 
                    key="settings"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="space-y-10"
                  >
                     <div className="flex items-center justify-between mb-4">
                        <div>
                           <h4 className="text-2xl font-display font-bold text-white tracking-tighter italic">Tactical Protocols</h4>
                           <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] mt-2">Adjust your unit operational preferences</p>
                        </div>
                     </div>
                     <div className="grid gap-4">
                        {[
                          { label: 'Flux Broadcast', desc: 'Auto-broadcast operational status shifts.', icon: Zap, active: true },
                          { label: 'Intel Matrix Dispatch', desc: 'Receive synthesized daily AI summary.', icon: Target, active: true },
                          { label: 'Squad Pings', desc: 'Alerts on high-priority mission shifts.', icon: Bell, active: false }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-6 bg-white/[0.02] rounded-2xl border border-white/[0.03] hover:bg-white/[0.05] transition-all group">
                             <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-black border border-white/5 rounded-2xl flex items-center justify-center shadow-2xl text-slate-700 group-hover:text-brand-400 transition-colors">
                                  <item.icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="text-xs font-black text-white uppercase tracking-[0.1em] mb-1.5">{item.label}</p>
                                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{item.desc}</p>
                                </div>
                             </div>
                             <div 
                              className={`w-12 h-6 rounded-full relative transition-all cursor-pointer p-1 ring-1 ring-white/10 ${item.active ? 'bg-brand-600 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-white/5'}`}
                             >
                                <div className={`w-4 h-4 bg-white rounded-full shadow-2xl transition-all ${item.active ? 'translate-x-6' : 'translate-x-0'}`} />
                             </div>
                          </div>
                        ))}
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Dangerous Zone */}
          <div className="bg-rose-500/5 rounded-3xl p-8 border border-rose-500/10 flex items-center justify-between group hover:bg-rose-500/10 transition-all backdrop-blur-sm">
            <div>
              <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-2 italic">Termination sequence</h4>
              <p className="text-[11px] font-bold text-rose-900/50 uppercase tracking-widest leading-none">Permanently decommission unit profile.</p>
            </div>
            <button className="h-11 px-8 bg-black hover:bg-rose-600 text-rose-500 hover:text-white font-black rounded-xl text-[10px] uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all border border-rose-500/20 group-hover:border-rose-500/50">
              Decommission Unit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
