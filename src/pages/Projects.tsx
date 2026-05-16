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
    <div className="space-y-10 pb-20 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-2">Projects</h1>
          <p className="text-slate-500 font-medium max-w-lg">
            Track and manage your high-level initiatives. Stay on top of deadlines and mission-critical milestones.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl mr-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/20 transition-all flex items-center gap-2 group active:scale-95"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Create Project</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Quickbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white p-2 rounded-3xl border border-slate-200/60 shadow-sm">
        <div className="flex items-center gap-4 px-6 py-4 border-r border-slate-100 last:border-0">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-display font-black text-slate-900 leading-none">{projects.length}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Active</p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-6 py-4 border-r border-slate-100 last:border-0">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-display font-black text-slate-900 leading-none">
              {projects.filter(p => p.progress === 100).length}
            </p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Shipped</p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-6 py-4 border-r border-slate-100 last:border-0">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-display font-black text-slate-900 leading-none">
              {projects.filter(p => new Date(p.dueDate) < new Date() && p.progress < 100).length}
            </p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Overdue</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by project name or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200/60 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all font-medium text-slate-600 shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200/60 rounded-[1.5rem] text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
          <Filter className="w-4 h-4" />
          <span>Refine View</span>
        </button>
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
                className={`group bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 overflow-hidden flex flex-col relative ${viewMode === 'list' ? 'flex-row items-center p-6 gap-8' : ''}`}
              >
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${progress === 100 ? 'from-emerald-400 to-emerald-600' : 'from-brand-500 to-brand-700'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className={`p-8 flex-1 ${viewMode === 'list' ? 'p-0 flex flex-row items-center gap-8 justify-between w-full' : ''}`}>
                  <div className={viewMode === 'list' ? 'flex-1 min-w-0' : ''}>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                        project.status === 'ACTIVE' 
                          ? 'bg-brand-50 text-brand-600 border-brand-100 group-hover:bg-brand-600 group-hover:text-white group-hover:border-transparent' 
                          : 'bg-slate-50 text-slate-500 border-slate-100 group-hover:bg-slate-900 group-hover:text-white'
                      }`}>
                        {project.status}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        {isAdmin && (
                          <button 
                            onClick={() => deleteProject(project.id)}
                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                        <button className="p-2 text-slate-300 hover:text-brand-500 hover:bg-brand-50 rounded-xl transition-all">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-slate-900 mb-2 truncate">
                      {project.name}
                    </h3>
                    <p className={`text-slate-500 text-sm font-medium leading-relaxed mb-8 ${viewMode === 'grid' ? 'line-clamp-2' : 'truncate'}`}>
                      {project.description}
                    </p>
                  </div>
                  
                  <div className={viewMode === 'list' ? 'w-48' : 'space-y-4 mb-8'}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Velocity</span>
                      <span className={`text-[11px] font-black ${progress === 100 ? 'text-emerald-500' : 'text-brand-600'}`}>{progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${progress === 100 ? 'from-emerald-400 to-emerald-600' : 'from-brand-500 to-brand-700'}`}
                      />
                    </div>
                  </div>

                  {viewMode === 'list' && (
                    <div className="flex items-center gap-6">
                      <div className="flex -space-x-3">
                        {project.members.slice(0, 3).map((memberId, idx) => {
                          const mValue = team.find(u => u.id === memberId);
                          return (
                            <img 
                              key={idx}
                              src={mValue?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`} 
                              alt="Avatar" 
                              className="w-10 h-10 rounded-xl border-4 border-white bg-slate-50 shadow-sm"
                            />
                          );
                        })}
                      </div>
                      <div className="flex flex-col text-right min-w-[80px]">
                        <p className="text-xs font-black text-slate-900">{formatDate(project.dueDate)}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Deadline</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {viewMode === 'grid' && (
                  <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex -space-x-3">
                      {project.members.slice(0, 3).map((memberId, idx) => {
                        const mVal = team.find(u => u.id === memberId);
                        return (
                          <img 
                            key={idx}
                            src={mVal?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${idx + project.id}`} 
                            alt="Avatar" 
                            className="w-10 h-10 rounded-xl border-4 border-white bg-white shadow-sm transition-transform group-hover:-translate-y-1"
                          />
                        );
                      })}
                      {project.members.length > 3 && (
                        <div className="w-10 h-10 rounded-xl border-4 border-white bg-white flex items-center justify-center text-[10px] font-black text-slate-600 shadow-sm translate-y-0 group-hover:-translate-y-1 transition-transform">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-slate-400">
                      <div className="flex flex-col items-end">
                        <p className="text-[10px] font-black text-slate-900 uppercase">{formatDate(project.dueDate)}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[10px] font-bold text-slate-400">{completedTasks}/{projectTasks.length} Done</span>
                        </div>
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-32 text-center bg-white rounded-[4rem] border border-dashed border-slate-300"
        >
          <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Briefcase className="w-12 h-12 text-slate-200" />
          </div>
          <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">No initiatives launched</h3>
          <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
            Your workspace is quiet. Start your first mission to mobilize the team and track progress towards your major goals.
          </p>
          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-[1.5rem] shadow-xl shadow-brand-500/20 transition-all flex items-center gap-3 mx-auto active:scale-95"
            >
              <Plus className="w-6 h-6" />
              <span>Launch Mission</span>
            </button>
          )}
        </motion.div>
      )}

      {/* New Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight mb-2">New Project</h2>
                    <p className="text-slate-400 font-medium">Define the core mission details.</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mission Name</label>
                    <input 
                      type="text" 
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter a punchy project title..."
                      className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-semibold text-slate-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Brief Description</label>
                    <textarea 
                      required
                      rows={3}
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="What are we looking to achieve here?"
                      className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-semibold text-slate-700 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Deadline</label>
                      <input 
                        type="date" 
                        required
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                        className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-semibold text-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Visibility</label>
                      <div className="px-6 py-4 bg-slate-100/50 border border-slate-200/60 rounded-2xl text-slate-500 font-bold text-sm flex items-center justify-between italic">
                        Team Only
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-slate-900 hover:bg-brand-600 text-white rounded-[1.5rem] font-bold shadow-xl shadow-slate-900/10 hover:shadow-brand-500/20 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
                  >
                    <span>Create Mission</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
