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

export default function Profile() {
  const { user } = useAuth();
  const { tasks, projects } = useData();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SETTINGS' | 'SECURITY' | 'BILLING'>('OVERVIEW');
  
  const userTasks = tasks.filter(t => t.assignedTo === user?.id);
  const userProjects = projects.filter(p => p.members.includes(user?.id || ''));
  const completedTasks = userTasks.filter(t => t.status === 'COMPLETED');
  const productivity = userTasks.length > 0 ? Math.round((completedTasks.length / userTasks.length) * 100) : 0;

  return (
    <div className="space-y-10 pb-24 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-2">Account Config</h1>
          <p className="text-slate-500 font-medium max-w-lg">
            Manage your digital identity and workspace preferences. Keep your sync settings in check.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/20 transition-all flex items-center gap-2 group active:scale-95">
             <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
             <span>Update Profile</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Card Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3.5rem] p-10 border border-slate-200/60 shadow-sm relative overflow-hidden group"
          >
            {/* Background Accent */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-slate-900 group-hover:bg-brand-600 transition-colors duration-700" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative mb-8 mt-10">
                <div className="w-36 h-36 rounded-[2.5rem] bg-white p-2 shadow-2xl group-hover:rotate-3 transition-transform duration-500">
                  <div className="w-full h-full rounded-[2.2rem] overflow-hidden">
                    <img 
                      src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                      alt={user?.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-3.5 bg-brand-600 rounded-2xl shadow-xl text-white border-4 border-white hover:bg-brand-700 transition-all active:scale-90">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              
              <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">{user?.name}</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2 mb-8">{user?.role} — SYNCPRO HQ</p>
              
              <div className="flex items-center gap-3 mb-10">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Active Now
                </div>
                {user?.role === 'ADMIN' && (
                   <div className="px-4 py-1.5 bg-brand-50 text-brand-600 rounded-full border border-brand-100 text-[10px] font-black uppercase tracking-widest">
                    Authorized
                  </div>
                )}
              </div>

              <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-50 pt-10">
                <div className="text-center">
                  <p className="text-2xl font-display font-black text-slate-900">{userTasks.length}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">Targeted</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-display font-black text-slate-900">{completedTasks.length}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">Achieved</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[3rem] p-10 border border-slate-200/60 shadow-sm"
          >
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Metadata</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-500 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Primary Link</p>
                  <p className="text-sm font-bold text-slate-700">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-violet-50 group-hover:text-violet-500 transition-colors">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Identity Epoch</p>
                  <p className="text-sm font-bold text-slate-700">Started {formatDate(user?.joinedAt || new Date().toISOString())}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Timezone Offset</p>
                  <p className="text-sm font-bold text-slate-700">UTC +00:00 (Global)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Tabs */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[3.5rem] border border-slate-200/60 shadow-sm overflow-hidden min-h-[600px]">
            <div className="flex items-center px-10 pt-8 border-b border-slate-50">
              {[
                { id: 'OVERVIEW', label: 'Identity' },
                { id: 'SETTINGS', label: 'Protocols' },
                { id: 'SECURITY', label: 'Vault' },
                { id: 'BILLING', label: 'Credits' }
              ].map(tab => (
                 <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-6 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${
                    activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-6 right-6 h-1 bg-brand-600 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-10">
              <AnimatePresence mode="wait">
                {activeTab === 'OVERVIEW' && (
                  <motion.div 
                    key="overview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    {/* Focus Metrics */}
                    <section>
                      <div className="flex items-center justify-between mb-8">
                        <div>
                           <h4 className="text-xl font-display font-black text-slate-900 tracking-tight">Performance Intel</h4>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time engagement telemetry</p>
                        </div>
                        <Activity className="w-8 h-8 text-brand-600 opacity-20" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="p-8 rounded-[2.5rem] bg-brand-50/50 border border-brand-100/50 flex items-center justify-between group hover:bg-brand-50 transition-colors">
                          <div className="flex items-center gap-6">
                             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-500/10 text-3xl font-display font-black text-brand-600 group-hover:scale-110 transition-transform">
                              {productivity}%
                            </div>
                            <div>
                              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Velocity Score</p>
                              <p className="text-sm font-bold text-brand-900">Task completion index is high.</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-violet-50/50 border border-violet-100/50 flex items-center justify-between group hover:bg-violet-50 transition-colors">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-500/10 text-3xl font-display font-black text-violet-600 group-hover:scale-110 transition-transform">
                              8.4
                            </div>
                            <div>
                              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Impact Factor</p>
                              <p className="text-sm font-bold text-violet-900">Contribution weight to squad.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Quick Access */}
                    <section>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Linked Active Sessions</h4>
                      <div className="space-y-4">
                        {userProjects.slice(0, 3).map((p, i) => (
                           <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 group hover:border-brand-200 transition-all">
                            <div className="flex items-center gap-5">
                              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-500">
                                <Target className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">{p.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Active Operation</p>
                              </div>
                            </div>
                            <button className="p-3 hover:bg-white rounded-xl text-slate-400 hover:text-brand-600 transition-all">
                              <ArrowRight className="w-5 h-5" />
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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                     <h4 className="text-xl font-display font-black text-slate-900 tracking-tight mb-8 font-sans">Core Protocols</h4>
                     <div className="space-y-4">
                        {[
                          { label: 'Real-time Sync', desc: 'Auto-broadcast your status shifts.', icon: Zap, active: true },
                          { label: 'Intelligence Digest', desc: 'Daily AI summary of your backlog.', icon: Target, active: true },
                          { label: 'Squad Notifications', desc: 'Ping when mission parameters shift.', icon: Bell, active: false }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100">
                             <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-brand-600 transition-colors">
                                  <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                  <p className="text-base font-bold text-slate-900">{item.label}</p>
                                  <p className="text-xs font-medium text-slate-500">{item.desc}</p>
                                </div>
                             </div>
                             <div className={`w-14 h-8 rounded-full relative transition-all cursor-pointer p-1 ${item.active ? 'bg-brand-600' : 'bg-slate-200'}`}>
                                <div className={`w-6 h-6 bg-white rounded-full transition-all shadow-md ${item.active ? 'translate-x-6' : 'translate-x-0'}`} />
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
          <div className="bg-red-50/30 rounded-[3rem] p-10 border border-red-100 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-black text-red-600 uppercase tracking-widest mb-1 italic">Mission Termination</h4>
              <p className="text-xs font-bold text-red-900/50">Permanently scrap your account and all associated data archives.</p>
            </div>
            <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-red-600/20 active:scale-95 transition-all">
              Delete Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
