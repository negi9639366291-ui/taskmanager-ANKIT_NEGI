import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle2,
  Trash2,
  Briefcase,
  ArrowRight,
  MoreVertical,
  X,
  Target,
  Users as UsersIcon,
  LayoutGrid,
  List,
  AlertCircle
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

export default function Projects() {
  const { projects, team, tasks, addProject, deleteProject } = useData();
  const { user } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // New project state
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  const isAdmin = user?.role === 'ADMIN';

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      name: newName,
      description: newDesc,
      dueDate: new Date(newDueDate).toISOString(),
    });
    setNewName('');
    setNewDesc('');
    setNewDueDate('');
    setIsModalOpen(false);
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-400">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight mb-1">Projects</h1>
          <p className="text-slate-600 font-bold max-w-md text-[10px] uppercase tracking-widest leading-relaxed">
            Manage your high-level initiatives and major strategic goals.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white/[0.03] p-1 rounded-lg border border-white/[0.05]">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white/10 shadow-sm text-brand-400' : 'text-slate-600 hover:text-white'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white/10 shadow-sm text-brand-400' : 'text-slate-600 hover:text-white'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="h-9 px-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg shadow-lg transition-all flex items-center gap-2 group active:scale-95 text-[10px] uppercase tracking-[0.15em] border border-white/5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Mission</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Quickbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/[0.02] p-1 rounded-xl border border-white/[0.05] shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3 px-6 py-4 border-r border-white/[0.05] last:border-0 relative group">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-display font-bold text-white leading-none">{projects.length}</p>
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1.5">Total Active</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-4 border-r border-white/[0.05] last:border-0 relative group">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-display font-bold text-white leading-none">
              {projects.filter(p => p.progress === 100).length}
            </p>
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1.5">Shipped</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-4 border-r border-white/[0.05] last:border-0 relative group">
          <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400 border border-amber-500/20 group-hover:bg-amber-500/20 transition-all">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-display font-bold text-white leading-none">
              {projects.filter(p => new Date(p.dueDate) < new Date() && p.progress < 100).length}
            </p>
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1.5">Overdue</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-brand-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search missions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all font-bold text-xs text-white placeholder:text-slate-800 shadow-sm"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}
        >
          {filteredProjects.map((project) => {
            const projectTasks = tasks.filter(t => t.projectId === project.id);
            const completedTasks = projectTasks.filter(t => t.status === 'COMPLETED').length;
            const progress = projectTasks.length > 0 ? Math.round((completedTasks / projectTasks.length) * 100) : 0;
            
            return (
              <motion.div 
                layout
                key={project.id}
                variants={itemVariants}
                className={`group bg-white/[0.01] rounded-xl border border-white/[0.03] shadow-lg transition-all duration-300 overflow-hidden flex flex-col relative hover:bg-white/[0.03] hover:border-white/[0.06] hover:shadow-brand-500/5 ${viewMode === 'list' ? 'flex-row items-center p-4 gap-6' : ''}`}
              >
                <div className={`p-6 flex-1 ${viewMode === 'list' ? 'p-0 flex flex-row items-center gap-6 justify-between w-full' : ''}`}>
                  <div className={viewMode === 'list' ? 'flex-1 min-w-0' : ''}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${
                        project.status === 'ACTIVE' 
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                          : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                      }`}>
                        {project.status}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        {isAdmin && (
                          <button 
                            onClick={() => deleteProject(project.id)}
                            className="p-1.5 hover:text-rose-500 rounded-lg transition-all text-slate-700 hover:bg-rose-500/10"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button className="p-1.5 hover:text-white rounded-lg transition-all text-slate-700 hover:bg-white/5">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-base font-bold text-white mb-2 truncate group-hover:text-brand-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className={`text-slate-600 text-[11px] font-bold uppercase tracking-tight mb-5 leading-relaxed ${viewMode === 'grid' ? 'line-clamp-2' : 'truncate'}`}>
                      {project.description}
                    </p>
                  </div>
                  
                  <div className={viewMode === 'list' ? 'w-48' : 'space-y-2.5 mb-6'}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]">Deployment Velocity</span>
                      <span className={`text-[10px] font-black ${progress === 100 ? 'text-emerald-500' : 'text-brand-500'}`}>{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.05]">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-brand-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]`}
                      />
                    </div>
                  </div>

                  {viewMode === 'list' && (
                    <div className="flex items-center gap-6">
                      <div className="flex -space-x-3">
                        {project.members.slice(0, 3).map((memberId, idx) => {
                          const mValue = team.find(u => u.id === memberId);
                          return (
                            <Avatar 
                              key={idx}
                              name={mValue?.name} 
                              size="sm"
                              className="border-2 border-black shadow-2xl"
                            />
                          );
                        })}
                      </div>
                      <div className="flex flex-col text-right min-w-[80px]">
                        <p className="text-[10px] font-black text-white uppercase tracking-widest">{formatDate(project.dueDate)}</p>
                        <p className="text-[8px] font-bold text-slate-700 uppercase tracking-widest mt-0.5">Deadline</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {viewMode === 'grid' && (
                  <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.05] flex items-center justify-between mt-auto">
                    <div className="flex -space-x-3">
                      {project.members.slice(0, 3).map((memberId, idx) => {
                        const mVal = team.find(u => u.id === memberId);
                        return (
                          <Avatar 
                            key={idx}
                            name={mVal?.name} 
                            size="sm"
                            className="border-2 border-black shadow-2xl"
                          />
                        );
                      })}
                      {project.members.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-black bg-slate-800 flex items-center justify-center text-[9px] font-black text-white shadow-2xl z-10">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <p className="text-[10px] font-black text-white uppercase tracking-widest">{formatDate(project.dueDate)}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500/60" />
                        <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.1em]">{completedTasks}/{projectTasks.length} NODES</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-40 text-center bg-white/[0.01] rounded-[3rem] border border-dashed border-white/[0.1] backdrop-blur-sm"
        >
          <div className="w-24 h-24 bg-white/[0.03] rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner border border-white/[0.05]">
            <Briefcase className="w-10 h-10 text-slate-800" />
          </div>
            <h3 className="text-3xl font-display font-bold text-white mb-4 tracking-tighter italic">NEXUS EMPTY</h3>
            <p className="text-slate-600 font-bold max-w-sm mx-auto mb-12 leading-relaxed uppercase tracking-widest text-[10px]">
              Strategic grid is inactive. Initialize your first mission to mobilize team units and commence operations.
            </p>
            {isAdmin && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-12 py-5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl shadow-3xl shadow-brand-500/20 transition-all flex items-center gap-4 mx-auto active:scale-95 uppercase tracking-[0.3em] text-[11px] border border-white/5"
              >
                <Plus className="w-5 h-5" />
                <span>Initialize Mission</span>
              </button>
            )}
        </motion.div>
      )}

      {/* New Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-dark-card border border-white/[0.05] w-full max-w-lg rounded-2xl shadow-3xl overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white tracking-tighter leading-none">New Strategic Mission</h2>
                    <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em] mt-3 leading-none">Define mission parameters</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2.5 hover:bg-white/5 rounded-xl text-slate-700 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Mission Identifier</label>
                    <input 
                      type="text" 
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Title of initiative..."
                      className="w-full px-5 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white/[0.04] transition-all font-bold text-white text-xs placeholder:text-slate-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Mission Objectives</label>
                    <textarea 
                      required
                      rows={3}
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Define high-level outcomes..."
                      className="w-full px-5 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white/[0.04] transition-all text-xs font-bold text-white resize-none placeholder:text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Strategic Deadline</label>
                      <input 
                        type="date" 
                        required
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                        className="w-full px-5 h-11 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white/[0.04] transition-all font-black text-white text-[11px] uppercase"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Operational Privacy</label>
                      <div className="px-5 h-11 bg-white/[0.01] border border-white/[0.03] rounded-xl text-slate-700 font-black text-[10px] uppercase tracking-widest flex items-center justify-between italic">
                        Internal Units Only
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-14 mt-6 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-brand-500/20 transition-all flex items-center justify-center gap-3 group active:scale-95 border border-white/5"
                  >
                    <span>Deploy Mission</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
