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
    <div className="space-y-10 pb-20 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-2">Team Squad</h1>
          <p className="text-slate-500 font-medium max-w-lg">
            Manage your high-performance squad. View capacity, productivity scores, and mission contributions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/20 transition-all flex items-center gap-2 group active:scale-95">
              <UserPlus className="w-5 h-5" />
              <span>Deploy Member</span>
            </button>
          )}
        </div>
      </div>

      {/* Team Stats Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Squad', value: team.length, icon: Users, color: 'text-brand-600', bg: 'bg-brand-50' },
          { label: 'Avg Velocity', value: '84%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Peak Capacity', value: '12/15', icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Missions Done', value: '428', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-display font-black text-slate-900 leading-none">{stat.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 group w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Identify team member..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200/60 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all font-medium text-slate-600 shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200/60 rounded-[1.5rem] text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
          <Filter className="w-4 h-4" />
          <span>Refine</span>
        </button>
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
              whileHover={{ y: -8 }}
              className="bg-white rounded-[3rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden group p-8 flex flex-col relative"
            >
              {/* Gradient Accent */}
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${member.role === 'ADMIN' ? 'from-brand-500 to-indigo-600' : 'from-emerald-400 to-emerald-600'} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="flex justify-between items-start mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-inner group-hover:rotate-3 transition-transform duration-500">
                    <img 
                      src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 z-10">
                    {member.role === 'ADMIN' ? (
                      <Shield className="w-5 h-5 text-brand-600" />
                    ) : (
                      <Star className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                  <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white animate-pulse"></div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-brand-600 transition-all">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight mb-1">{member.name}</h3>
                <p className="text-xs font-bold text-slate-400 mb-6 truncate">{member.email}</p>
                <div className="flex items-center gap-2">
                   <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                    member.role === 'ADMIN' ? "bg-brand-50 text-brand-600 border-brand-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                  }`}>
                    {member.role === 'ADMIN' ? 'Strategic Lead' : 'Squad Member'}
                  </span>
                  {productivity > 80 && (
                    <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-full text-[9px] font-black uppercase tracking-widest">
                      Top Performer
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 rounded-3xl p-5 group-hover:bg-brand-50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckSquare className="w-4 h-4 text-brand-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-400">Backlog</span>
                  </div>
                  <p className="text-2xl font-display font-black text-slate-900 group-hover:text-brand-700 transition-colors">{userTasks.length}</p>
                </div>
                <div className="bg-slate-50 rounded-3xl p-5 group-hover:bg-emerald-50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-400">Shipped</span>
                  </div>
                  <p className="text-2xl font-display font-black text-slate-900 group-hover:text-emerald-700 transition-colors">{completedTasks}</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Team Performance Score</span>
                  <span className="text-xs font-black text-slate-900">{productivity}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${productivity}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full bg-slate-900 rounded-full ${productivity > 80 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-slate-900'}`}
                  />
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 opacity-60">
                   <Clock className="w-3.5 h-3.5 text-slate-400" />
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active since {formatDate(member.joinedAt)}</p>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-black text-brand-600 uppercase hover:text-brand-700 transition-colors group/btn">
                  Profile <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Invite Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-600 rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-500/20"
      >
        <Star className="absolute -top-10 -left-10 w-48 h-48 text-white/10 rotate-12" />
        <TrendingUp className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 -rotate-12" />
        <div className="relative z-10">
          <h2 className="text-4xl font-display font-black mb-4">Building a Power Team?</h2>
          <p className="text-brand-100 mb-10 max-w-lg mx-auto font-medium">
            A high-performance squad is only 20% headcount and 80% coordination. Invite your top performers now.
          </p>
          <button className="px-10 py-5 bg-white text-brand-600 rounded-[2rem] font-black text-lg hover:bg-brand-50 transition-all shadow-xl active:scale-95">
            Share Invite Link
          </button>
        </div>
      </motion.div>
    </div>
  );
}
