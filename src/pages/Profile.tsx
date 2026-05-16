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
    <div className="space-y-6 pb-12 font-sans text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight mb-1">Account</h1>
          <p className="text-slate-500 font-medium max-w-md text-sm leading-relaxed">
            Manage your profile and preferences.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-9 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 group active:scale-95 text-[11px] uppercase tracking-wider">
             <Settings className="w-4 h-4" />
             <span>Update Profile</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 border border-slate-200/60 shadow-sm relative overflow-hidden group"
          >
            {/* Background Accent */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-slate-900 group-hover:bg-brand-600 transition-colors duration-700" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative mb-6 mt-6">
                <div className="w-20 h-20 rounded-xl bg-white p-1 shadow-xl">
                  <Avatar name={user?.name} size="xl" className="w-full h-full rounded-lg" />
                </div>
                <button className="absolute -bottom-1 -right-1 p-1.5 bg-brand-600 rounded-lg shadow-lg text-white border-2 border-white hover:bg-brand-700 transition-all active:scale-90">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{user?.name}</h2>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 mb-6">{user?.role} — HQ</p>
              
              <div className="flex items-center gap-2 mb-8">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-[9px] font-black uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  Active
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900">{userTasks.length}</p>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Tasks</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900">{completedTasks.length}</p>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Done</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 border border-slate-200/60 shadow-sm"
          >
            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-6">Metadata</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Email</p>
                  <p className="text-[11px] font-bold text-slate-700">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Epoch</p>
                  <p className="text-[11px] font-bold text-slate-700">{formatDate(user?.joinedAt || new Date().toISOString())}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Tabs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden min-h-[500px]">
            <div className="flex items-center px-6 pt-2 border-b border-slate-50">
              {[
                { id: 'OVERVIEW', label: 'Identity' },
                { id: 'SETTINGS', label: 'Protocols' },
                { id: 'SECURITY', label: 'Vault' }
              ].map(tab => (
                 <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all relative ${
                    activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-600 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'OVERVIEW' && (
                  <motion.div 
                    key="overview"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-8"
                  >
                    {/* Focus Metrics */}
                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                           <h4 className="text-lg font-bold text-slate-900 tracking-tight leading-none">Performance Intel</h4>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time telemetry</p>
                        </div>
                        <Activity className="w-5 h-5 text-brand-600 opacity-20" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm text-xl font-bold text-brand-600">
                              {productivity}%
                            </div>
                            <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Velocity</p>
                              <p className="text-[11px] font-bold text-slate-700">Completion index.</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm text-xl font-bold text-violet-600">
                              8.4
                            </div>
                            <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Impact</p>
                              <p className="text-[11px] font-bold text-slate-700">Squad contribution.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Quick Access */}
                    <section>
                      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-6">Active Operations</h4>
                      <div className="space-y-3">
                        {userProjects.slice(0, 3).map((p, i) => (
                           <div key={i} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-4">
                              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm text-slate-400">
                                <Target className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-[11px] font-bold text-slate-900 uppercase tracking-tight">{p.name}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Linked Project</p>
                              </div>
                            </div>
                            <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-brand-600 transition-all">
                              <ArrowRight className="w-4 h-4" />
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
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                     <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-6">Preferences</h4>
                     <div className="space-y-3">
                        {[
                          { label: 'Real-time Sync', desc: 'Auto-broadcast status shifts.', icon: Zap, active: true },
                          { label: 'Intelligence Digest', desc: 'Daily AI summary.', icon: Target, active: true },
                          { label: 'Squad Pings', desc: 'Alerts on mission shifts.', icon: Bell, active: false }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                             <div className="flex items-center gap-4">
                                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm text-slate-400">
                                  <item.icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-slate-900">{item.label}</p>
                                  <p className="text-[10px] font-medium text-slate-500">{item.desc}</p>
                                </div>
                             </div>
                             <div className={`w-10 h-5 rounded-full relative transition-all cursor-pointer p-0.5 ${item.active ? 'bg-brand-600' : 'bg-slate-200'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all ${item.active ? 'translate-x-5' : 'translate-x-0'}`} />
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
          <div className="bg-red-50/30 rounded-xl p-6 border border-red-100 flex items-center justify-between">
            <div>
              <h4 className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1 italic">Danger Zone</h4>
              <p className="text-[11px] font-bold text-red-900/50 leading-none">Permanently delete account.</p>
            </div>
            <button className="h-9 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-[10px] uppercase tracking-wider shadow-sm active:scale-95 transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
