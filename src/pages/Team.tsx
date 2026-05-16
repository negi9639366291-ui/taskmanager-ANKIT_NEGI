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
    <div className="space-y-6 pb-12 font-sans text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight mb-1">Team Squad</h1>
          <p className="text-slate-500 font-medium max-w-md text-sm leading-relaxed">
            Manage your high-performance squad and mission contributions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button className="h-9 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 group active:scale-95 text-[11px] uppercase tracking-wider">
              <UserPlus className="w-4 h-4" />
              <span>Deploy Member</span>
            </button>
          )}
        </div>
      </div>

      {/* Team Stats Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Squad', value: team.length, icon: Users, color: 'text-brand-600', bg: 'bg-brand-50' },
          { label: 'Avg Velocity', value: '84%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Peak Capacity', value: '12/15', icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Missions Done', value: '428', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex items-center gap-3">
            <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 leading-none">{stat.value}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 group w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200/60 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all font-medium text-slate-600 text-sm shadow-sm"
          />
        </div>
      </div>

      {/* Team Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTeam.map((member) => {
          const userTasks = tasks.filter(t => t.assignedTo === member.id);
          const completedTasks = userTasks.filter(t => t.status === 'COMPLETED').length;
          const productivity = userTasks.length > 0 ? Math.round((completedTasks / userTasks.length) * 100) : 0;
          
          return (
            <motion.div 
              key={member.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl border border-slate-200/60 shadow-sm transition-all duration-300 group p-5 flex flex-col relative"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-slate-50 shadow-sm">
                    <img 
                      src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 hover:bg-slate-50 rounded-md text-slate-400 hover:text-brand-600 transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-slate-50 rounded-md text-slate-400 hover:text-slate-900 transition-all">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-none mb-1">{member.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 mb-4 truncate">{member.email}</p>
                <div className="flex items-center gap-2">
                   <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border transition-all ${
                    member.role === 'ADMIN' ? "bg-brand-50 text-brand-600 border-brand-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                  }`}>
                    {member.role === 'ADMIN' ? 'Strategic Lead' : 'Squad Member'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-base font-bold text-slate-900 leading-none">{userTasks.length}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Backlog</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-base font-bold text-slate-900 leading-none">{completedTasks}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Shipped</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Performance</span>
                  <span className="text-[10px] font-black text-slate-900">{productivity}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${productivity}%` }}
                    className={`h-full rounded-full bg-brand-600`}
                  />
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Member</p>
                <button className="flex items-center gap-1 text-[9px] font-black text-brand-600 uppercase hover:text-brand-700 transition-colors">
                  Details <ChevronRight className="w-3 h-3" />
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
        className="bg-brand-600 rounded-xl p-8 text-center text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">Building a Power Team?</h2>
          <p className="text-brand-100 mb-6 max-w-lg mx-auto text-sm font-medium">
            Invite your top performers and scale your squad throughput.
          </p>
          <button className="h-10 px-6 bg-white text-brand-600 rounded-lg text-sm font-bold hover:bg-brand-50 transition-all active:scale-95">
            Share Invite Link
          </button>
        </div>
      </motion.div>
    </div>
  );
}
