import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Mail, 
  MoreVertical, 
  Search, 
  Filter,
  CheckSquare,
  Activity,
  Trophy,
  Star,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  MessageCircle,
  Clock,
  X
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

import { Avatar } from '../components/Avatar';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0 }
};

export default function Team() {
  const { team, tasks } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  const isAdmin = user?.role === 'ADMIN';

  const filteredTeam = team.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-400">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight mb-1">Squad Units</h1>
          <p className="text-slate-600 font-bold max-w-md text-[10px] uppercase tracking-widest leading-relaxed">
            Manage your high-performance team and track member contributions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button className="h-9 px-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg shadow-lg transition-all flex items-center gap-2 group active:scale-95 text-[10px] uppercase tracking-[0.15em] border border-white/5">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Invite Unit</span>
            </button>
          )}
        </div>
      </div>

      {/* Team Stats Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Units', value: team.length, icon: Users, color: 'text-brand-400', bg: 'bg-brand-500/10' },
          { label: 'Force Multiplier', value: '84%', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Current Capacity', value: '12/15', icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-500/10' },
          { label: 'Objectives Met', value: '428', icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/[0.02] p-5 rounded-xl border border-white/[0.05] shadow-lg flex items-center gap-4 hover:bg-white/[0.04] transition-all group backdrop-blur-md">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color} border border-white/[0.05] group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xl font-display font-bold text-white leading-none">{stat.value}</p>
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 group w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-brand-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search tactical units..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all font-bold text-xs text-white placeholder:text-slate-800 shadow-sm"
          />
        </div>
      </div>

      {/* Team Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredTeam.map((member) => {
          const userTasks = tasks.filter(t => t.assignedTo === member.id);
          const completedTasks = userTasks.filter(t => t.status === 'COMPLETED').length;
          const productivity = userTasks.length > 0 ? Math.round((completedTasks / userTasks.length) * 100) : 0;
          
          return (
            <motion.div 
              key={member.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white/[0.01] rounded-2xl border border-white/[0.03] shadow-xl transition-all duration-300 group p-6 flex flex-col relative hover:bg-white/[0.03] hover:border-white/[0.06] hover:shadow-brand-500/5 backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="relative">
                  <Avatar name={member.name} size="xl" className="rounded-2xl border-2 border-white/5 shadow-2xl" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-black shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                </div>
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                  <button className="p-2 hover:bg-white/5 rounded-xl text-slate-700 hover:text-brand-400 transition-all">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-xl text-slate-700 hover:text-white transition-all">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-display font-bold text-white tracking-tight leading-none mb-2 group-hover:text-brand-400 transition-colors">{member.name}</h3>
                <p className="text-[10px] font-bold text-slate-600 mb-6 truncate uppercase tracking-widest">{member.email}</p>
                <div className="flex items-center gap-2">
                   <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${
                    member.role === 'ADMIN' ? "bg-brand-500/10 text-brand-400 border-brand-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}>
                    {member.role === 'ADMIN' ? 'Command' : 'Tactical Unit'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/[0.02] border border-white/[0.03] rounded-2xl p-4 group-hover:bg-white/[0.04] transition-colors">
                  <p className="text-lg font-display font-bold text-white leading-none">{userTasks.length}</p>
                  <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mt-2">Active backlog</p>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.03] rounded-2xl p-4 group-hover:bg-white/[0.04] transition-colors">
                  <p className="text-lg font-display font-bold text-white leading-none">{completedTasks}</p>
                  <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mt-2">Shipped Nodes</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]">Deployment Performance</span>
                  <span className="text-[10px] font-black text-brand-500">{productivity}%</span>
                </div>
                <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.05]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${productivity}%` }}
                    className={`h-full rounded-full bg-brand-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]`}
                  />
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/[0.03] flex items-center justify-between">
                <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">Operational Unit</p>
                <button className="flex items-center gap-2 text-[9px] font-black text-brand-400 hover:text-brand-300 uppercase tracking-[0.2em] transition-all group/btn">
                  Full Analytics <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Invite Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-600 rounded-[2rem] p-12 text-center text-white relative overflow-hidden shadow-3xl shadow-brand-500/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold mb-4 tracking-tighter italic">Building a Power Team?</h2>
          <p className="text-brand-100 mb-10 max-w-lg mx-auto text-[11px] font-bold uppercase tracking-[0.25em] leading-relaxed">
            Invite your top performers and scale your strategic squad throughput instantly.
          </p>
          <button className="h-12 px-10 bg-white text-brand-600 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-50 transition-all active:scale-95 shadow-2xl">
            Global Invite Link
          </button>
        </div>
      </motion.div>
    </div>
  );
}
