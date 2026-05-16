/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Users, 
  UserPlus, 
  Shield, 
  Mail, 
  MoreVertical, 
  Search, 
  Filter,
  CheckSquare,
  Activity
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { formatDate, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Team() {
  const { team, tasks } = useData();
  const { user } = useAuth();
  
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight text-indigo-950 uppercase">Team Members</h1>
          <p className="text-slate-500 font-medium">Manage your workspace collaborators and their permissions.</p>
        </div>
        {isAdmin && (
          <button className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
            <UserPlus className="w-5 h-5" /> Add Member
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/10 focus:border-slate-400 transition-all font-medium text-slate-600"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member) => {
          const userTasks = tasks.filter(t => t.assignedTo === member.id);
          const completedTasks = userTasks.filter(t => t.status === 'COMPLETED').length;
          const productivity = userTasks.length > 0 ? Math.round((completedTasks / userTasks.length) * 100) : 0;
          
          return (
            <motion.div 
              layout
              key={member.id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group p-8"
            >
               <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-20 h-20 rounded-3xl border-4 border-slate-50 group-hover:border-indigo-100 transition-colors object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-xl shadow-lg flex items-center justify-center border border-slate-100">
                    {member.role === 'ADMIN' ? (
                      <Shield className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <Users className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-indigo-600 transition-all">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{member.name}</h3>
                <p className="text-sm font-medium text-slate-400 mb-4">{member.email}</p>
                <div className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest",
                  member.role === 'ADMIN' ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                )}>
                  {member.role}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tasks</span>
                  </div>
                  <p className="text-xl font-extrabold text-slate-900">{userTasks.length}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Done</span>
                  </div>
                  <p className="text-xl font-extrabold text-slate-900">{completedTasks}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Productivity</span>
                  <span className="text-xs font-extrabold text-slate-900">{productivity}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${productivity}%` }}
                    className="h-full bg-slate-800 rounded-full"
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Joined {formatDate(member.joinedAt)}</p>
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
