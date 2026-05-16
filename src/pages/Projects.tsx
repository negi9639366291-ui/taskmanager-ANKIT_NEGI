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
    <div className="space-y-6 pb-12 font-sans text-slate-900">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight mb-1">Projects</h1>
          <p className="text-slate-500 font-medium max-w-md text-sm leading-relaxed">
            Manage your high-level initiatives and major goals.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="h-9 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 group active:scale-95 text-[11px] uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Quickbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-1 rounded-xl border border-slate-200/60 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3 border-r border-slate-100 last:border-0">
          <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 leading-none">{projects.length}</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Active</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 border-r border-slate-100 last:border-0">
          <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 leading-none">
              {projects.filter(p => p.progress === 100).length}
            </p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Shipped</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 border-r border-slate-100 last:border-0">
          <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 leading-none">
              {projects.filter(p => new Date(p.dueDate) < new Date() && p.progress < 100).length}
            </p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Overdue</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200/60 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all font-medium text-slate-600 text-sm shadow-sm"
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
                className={`group bg-white rounded-xl border border-slate-200/60 shadow-sm transition-all duration-300 overflow-hidden flex flex-col relative ${viewMode === 'list' ? 'flex-row items-center p-4 gap-6' : ''}`}
              >
                <div className={`p-5 flex-1 ${viewMode === 'list' ? 'p-0 flex flex-row items-center gap-6 justify-between w-full' : ''}`}>
                  <div className={viewMode === 'list' ? 'flex-1 min-w-0' : ''}>
                    <div className="flex justify-between items-start mb-3">
                      <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border transition-all ${
                        project.status === 'ACTIVE' 
                          ? 'bg-brand-50 text-brand-600 border-brand-100' 
                          : 'bg-slate-50 text-slate-500 border-slate-100'
                      }`}>
                        {project.status}
                      </div>
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all">
                        {isAdmin && (
                          <button 
                            onClick={() => deleteProject(project.id)}
                            className="p-1 hover:text-red-500 rounded-md transition-all text-slate-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button className="p-1 hover:text-brand-500 rounded-md transition-all text-slate-300">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-base font-bold text-slate-900 mb-1 truncate">
                      {project.name}
                    </h3>
                    <p className={`text-slate-500 text-[11px] font-medium leading-relaxed mb-4 ${viewMode === 'grid' ? 'line-clamp-2' : 'truncate'}`}>
                      {project.description}
                    </p>
                  </div>
                  
                  <div className={viewMode === 'list' ? 'w-32' : 'space-y-2 mb-4'}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Velocity</span>
                      <span className={`text-[9px] font-black ${progress === 100 ? 'text-emerald-500' : 'text-brand-600'}`}>{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-brand-600`}
                      />
                    </div>
                  </div>

                  {viewMode === 'list' && (
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {project.members.slice(0, 3).map((memberId, idx) => {
                          const mValue = team.find(u => u.id === memberId);
                          return (
                            <img 
                              key={idx}
                              src={mValue?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`} 
                              alt="Avatar" 
                              className="w-7 h-7 rounded-lg border-2 border-white bg-slate-50 shadow-sm"
                            />
                          );
                        })}
                      </div>
                      <div className="flex flex-col text-right min-w-[60px]">
                        <p className="text-[10px] font-bold text-slate-900">{formatDate(project.dueDate)}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {viewMode === 'grid' && (
                  <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((memberId, idx) => {
                        const mVal = team.find(u => u.id === memberId);
                        return (
                          <img 
                            key={idx}
                            src={mVal?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${idx + project.id}`} 
                            alt="Avatar" 
                            className="w-7 h-7 rounded-lg border-2 border-white bg-white shadow-sm"
                          />
                        );
                      })}
                      {project.members.length > 3 && (
                        <div className="w-7 h-7 rounded-lg border-2 border-white bg-white flex items-center justify-center text-[8px] font-black text-slate-600 shadow-sm">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <p className="text-[9px] font-bold text-slate-900 uppercase">{formatDate(project.dueDate)}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                        <span className="text-[9px] font-bold text-slate-400">{completedTasks}/{projectTasks.length}</span>
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
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">No projects found</h3>
            <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
              Your workspace is quiet. Start your first project to mobilize the team and track progress towards your major goals.
            </p>
            {isAdmin && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-[1.5rem] shadow-xl shadow-brand-500/20 transition-all flex items-center gap-3 mx-auto active:scale-95"
              >
                <Plus className="w-6 h-6" />
                <span>Create Project</span>
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
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">New Project</h2>
                    <p className="text-slate-400 text-xs font-medium mt-1">Define the project details.</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Mission Name</label>
                    <input 
                      type="text" 
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Title..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-medium text-slate-700 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Brief Description</label>
                    <textarea 
                      required
                      rows={3}
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Objectives..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all text-sm font-medium resize-none shadow-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Deadline</label>
                      <input 
                        type="date" 
                        required
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-bold text-slate-700 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Visibility</label>
                      <div className="px-4 py-2 bg-slate-100 rounded-lg text-slate-500 font-bold text-xs flex items-center justify-between italic">
                        Team Only
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-11 mt-4 bg-slate-900 hover:bg-brand-600 text-white rounded-lg font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 group active:scale-95"
                  >
                    <span>Create Project</span>
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
