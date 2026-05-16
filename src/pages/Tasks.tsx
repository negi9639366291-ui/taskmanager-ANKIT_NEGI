import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Layout, 
  List, 
  Clock, 
  CheckCircle2,
  Calendar,
  ChevronRight,
  ArrowRight,
  MoreVertical,
  X,
  Target,
  GripVertical,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../lib/utils';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Task, TaskStatus, TaskPriority } from '../types';

export default function Tasks() {
  const { tasks, projects, team, addTask, updateTask, deleteTask } = useData();
  const { user } = useAuth();
  
  const [viewMode, setViewMode] = useState<'KANBAN' | 'LIST'>('KANBAN');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'ALL'>('ALL');
  
  // New task state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newProjectId, setNewProjectId] = useState('');
  const [newAssignedTo, setNewAssignedTo] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('MEDIUM');
  const [newDueDate, setNewDueDate] = useState('');

  const isAdmin = user?.role === 'ADMIN';

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title: newTitle,
      description: newDesc,
      projectId: newProjectId,
      assignedTo: newAssignedTo,
      priority: newPriority,
      dueDate: new Date(newDueDate).toISOString(),
    });
    // Reset
    setNewTitle('');
    setNewDesc('');
    setNewProjectId('');
    setNewAssignedTo('');
    setNewPriority('MEDIUM');
    setNewDueDate('');
    setIsModalOpen(false);
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || t.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statuses: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

  return (
    <div className="space-y-10 pb-20 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-5xl font-display font-black text-slate-900 tracking-tight mb-3 italic">Operations Backlog</h1>
          <p className="text-slate-500 font-medium max-w-lg text-lg leading-relaxed">
            Strategic mission control. Monitor work streams, adjust priorities, and optimize squad throughput in real-time.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner">
            <button 
              onClick={() => setViewMode('KANBAN')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'KANBAN' ? 'bg-white shadow-xl text-brand-600 scale-105' : 'text-slate-400 hover:text-slate-900'}`}
            >
              <Layout className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('LIST')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'LIST' ? 'bg-white shadow-xl text-brand-600 scale-105' : 'text-slate-400 hover:text-slate-900'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-black rounded-[1.5rem] shadow-2xl shadow-brand-500/20 transition-all flex items-center gap-3 group active:scale-95 text-xs uppercase tracking-widest"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              <span>Deploy Unit</span>
            </button>
          )}
        </div>
      </div>

      {/* Modern Filter Bar */}
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative flex-1 group w-full lg:w-auto">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-focus-within:bg-brand-50 group-focus-within:border-brand-100 transition-colors">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Focus tactical search on objectives..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-20 pr-6 py-6 bg-white border border-slate-200/60 rounded-[2.5rem] focus:outline-none focus:ring-8 focus:ring-brand-500/5 focus:border-brand-500 transition-all font-bold text-slate-600 shadow-sm placeholder:text-slate-300 placeholder:italic"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          <button 
            onClick={() => setSelectedStatus('ALL')}
            className={`px-6 py-4 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border ${selectedStatus === 'ALL' ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
          >
            All Sectors
          </button>
          {statuses.map(status => (
            <button 
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-6 py-4 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border ${selectedStatus === status ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
          <div className="w-px h-8 bg-slate-200 mx-2 flex-shrink-0" />
          <button className="p-4 bg-white border border-slate-200 border-dashed rounded-2xl text-slate-400 hover:text-slate-900 hover:border-brand-500 transition-all active:scale-90 flex-shrink-0">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      {viewMode === 'KANBAN' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <LayoutGroup>
            {statuses.map(status => (
              <div key={status} className="flex flex-col gap-8">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-lg flex items-center justify-center ${
                      status === 'COMPLETED' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' :
                      status === 'IN_PROGRESS' ? 'bg-brand-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' :
                      'bg-slate-300 shadow-[0_0_15px_rgba(203,213,225,0.5)]'
                    }`}>
                       <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em]">{status.replace('_', ' ')}</h3>
                    <div className="bg-slate-100 px-2.5 py-1 rounded-xl text-[10px] font-black text-slate-400 border border-slate-200/50">
                      {filteredTasks.filter(t => t.status === status).length}
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-300 hover:text-brand-600 transition-all border border-transparent hover:border-slate-100">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-[#f8fafc]/50 rounded-[3rem] p-6 min-h-[600px] border border-slate-200/40 space-y-6 shadow-inner relative overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {filteredTasks.filter(t => t.status === status).map((task) => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        team={team} 
                        projects={projects}
                        updateTask={updateTask} 
                        deleteTask={deleteTask}
                        isAdmin={isAdmin}
                      />
                    ))}
                  </AnimatePresence>
                  
                  {filteredTasks.filter(t => t.status === status).length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-16 border-4 border-dashed border-slate-200/50 rounded-[2.5rem] flex flex-col items-center justify-center text-center opacity-30"
                    >
                      <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mb-4">
                        <Clock className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Sector Clear</p>
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </LayoutGroup>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] border border-slate-200/60 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment Objective</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Context</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Intensity</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Window</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/70 transition-all group group cursor-pointer transition-colors">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateTask(task.id, { status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' });
                          }}
                          className={`w-8 h-8 rounded-xl border-3 flex items-center justify-center transition-all scale-100 group-hover:scale-110 active:scale-90 ${
                            task.status === 'COMPLETED' ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'border-slate-200 group-hover:border-brand-500 bg-white'
                          }`}
                        >
                          {task.status === 'COMPLETED' && <CheckCircle2 className="w-5 h-5" />}
                        </button>
                        <div>
                          <p className={`text-md font-bold uppercase tracking-tight transition-all ${task.status === 'COMPLETED' ? 'line-through text-slate-300' : 'text-slate-900'}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest">{task.status.replace('_', ' ')}</span>
                            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                            <span className="text-[10px] font-bold text-slate-400">ID: {task.id.slice(0, 8)}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3 px-4 py-2 bg-slate-100/50 rounded-2xl w-fit border border-slate-100">
                        <Target className="w-4 h-4 text-slate-400" />
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                          {projects.find(p => p.id === task.projectId)?.name || 'Nexus'}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white shadow-sm ring-2 ring-slate-100 group-hover:ring-brand-500/20 transition-all">
                           <img 
                            src={team.find(u => u.id === task.assignedTo)?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo}`} 
                            className="w-full h-full object-cover"
                            alt="Avatar"
                          />
                        </div>
                        <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{team.find(u => u.id === task.assignedTo)?.name || 'Unassigned'}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm ${
                        task.priority === 'HIGH' ? 'bg-red-50 text-red-600 border-red-100' :
                        task.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-brand-50 text-brand-600 border-brand-100'
                      }`}>
                        {task.priority} Tier
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 text-slate-900 mb-1">
                          <Calendar className="w-4 h-4 text-brand-500" />
                          <span className="text-sm font-black italic">{formatDate(task.dueDate)}</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Zulu Window</span>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTasks.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-32 text-center">
                      <div className="space-y-4 opacity-30">
                        <Search className="w-16 h-16 mx-auto text-slate-300" />
                        <p className="text-lg font-black text-slate-400 uppercase tracking-[0.4em]">Zero Intel Matches</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* New Task Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, rotateX: -20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.95, opacity: 0, rotateX: -20 }}
              className="relative bg-white w-full max-w-2xl rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              <div className="p-12 md:p-16 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 border border-brand-100 rounded-lg mb-4">
                      <Zap className="w-4 h-4 text-brand-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-600">Task Initiation</span>
                    </div>
                    <h2 className="text-4xl font-display font-black text-slate-900 tracking-tighter mb-2 italic">Craft Objective</h2>
                    <p className="text-slate-400 font-medium font-sans">Establish clear parameters for squad engagement.</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-12 h-12 hover:bg-slate-50 border border-slate-100 rounded-2xl text-slate-300 hover:text-brand-600 transition-all flex items-center justify-center shadow-sm"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Mission Identifier</label>
                    <input 
                      type="text" required
                      value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Title of objective"
                      className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-8 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-bold text-slate-800 text-lg placeholder:text-slate-300"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Tactical Intel</label>
                    <textarea 
                      required
                      rows={3}
                      value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Contextual details for team alignment..."
                      className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-8 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-semibold text-slate-700 resize-none placeholder:text-slate-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Strategic Link (Project)</label>
                      <select 
                        required
                        value={newProjectId} onChange={(e) => setNewProjectId(e.target.value)}
                        className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-8 focus:ring-brand-500/5 focus:border-brand-500 transition-all font-black text-slate-600 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_2rem_center] bg-no-repeat uppercase tracking-widest text-[10px]"
                      >
                        <option value="">Operational Nexus</option>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name.toUpperCase()}</option>)}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Threat Level (Priority)</label>
                      <select 
                        required
                        value={newPriority} onChange={(e) => setNewPriority(e.target.value as any)}
                        className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-8 focus:ring-brand-500/5 focus:border-brand-500 transition-all font-black text-slate-600 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_2rem_center] bg-no-repeat uppercase tracking-widest text-[10px]"
                      >
                        <option value="LOW">Low Index</option>
                        <option value="MEDIUM">Medium Index</option>
                        <option value="HIGH">Critical Index</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Deployment Owner</label>
                      <select 
                        required
                        value={newAssignedTo} onChange={(e) => setNewAssignedTo(e.target.value)}
                        className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-8 focus:ring-brand-500/5 focus:border-brand-500 transition-all font-black text-slate-600 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_2rem_center] bg-no-repeat uppercase tracking-widest text-[10px]"
                      >
                        <option value="">Select Asset</option>
                        {team.map(u => <option key={u.id} value={u.id}>{u.name.toUpperCase()}</option>)}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Zulu Deadline</label>
                      <input 
                        type="date" required
                        value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)}
                        className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-8 focus:ring-brand-500/5 focus:border-brand-500 transition-all font-black text-slate-700 text-[10px] uppercase tracking-widest"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-8 bg-slate-900 hover:bg-brand-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-brand-500/30 transition-all flex items-center justify-center gap-4 group active:scale-[0.98] mt-6"
                  >
                    <span>Deploy Tactical Objective</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
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

interface TaskCardProps {
  task: Task;
  team: any[];
  projects: any[];
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  isAdmin: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, team, projects, updateTask, deleteTask, isAdmin }) => {
  const member = team.find(u => u.id === task.assignedTo);
  const project = projects.find(p => p.id === task.projectId);
  
  const moveTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    const sequence: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'PENDING'];
    const nextIdx = sequence.indexOf(task.status) + 1;
    updateTask(task.id, { status: sequence[nextIdx] });
  };

  return (
    <motion.div 
      layout
      layoutId={task.id}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      whileHover={{ y: -6, shadow: '0 30px 60px -12px rgba(0,0,0,0.15)' }}
      className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm transition-all group flex flex-col relative overflow-hidden"
    >
      {/* Visual Indicator */}
      <div className={`absolute top-0 left-0 w-full h-1.5 ${
        task.priority === 'HIGH' ? 'bg-red-500' :
        task.priority === 'MEDIUM' ? 'bg-amber-500' :
        'bg-brand-500'
      }`} />

      <div className="flex items-start justify-between mb-6">
        <div className="flex flex-col gap-2">
           <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border w-fit ${
            task.priority === 'HIGH' ? 'bg-red-50 text-red-600 border-red-100' :
            task.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-600 border-amber-100' :
            'bg-brand-50 text-brand-600 border-brand-100'
          }`}>
            {task.priority} Tier
          </div>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest truncate max-w-[180px]">
            {project?.name || 'Tactical Nexus'}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <button onClick={moveTask} className="w-9 h-9 bg-slate-50 hover:bg-brand-50 rounded-xl text-slate-300 hover:text-brand-600 transition-all flex items-center justify-center border border-slate-100">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 bg-slate-50 hover:bg-slate-900 rounded-xl text-slate-300 hover:text-white transition-all flex items-center justify-center border border-slate-100">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h4 className="text-md font-display font-black text-slate-900 mb-2 uppercase tracking-tight leading-tight group-hover:text-brand-600 transition-colors">
        {task.title}
      </h4>
      <p className="text-[11px] font-medium text-slate-400 line-clamp-2 mb-8 leading-relaxed font-sans italic">
        {task.description}
      </p>

      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group/avatar">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white shadow-md ring-2 ring-slate-100 group-hover:ring-brand-500/30 transition-all">
              <img 
                src={member?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                alt="Avatar" 
              />
            </div>
            {task.status === 'IN_PROGRESS' && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-500 border-2 border-white rounded-lg animate-pulse shadow-lg shadow-brand-500/50"></span>
            )}
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[100px]">{member?.name.split(' ')[0]}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-300 group-hover:text-slate-500 transition-colors">
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black">04</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-brand-600 font-black">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-tighter">{formatDate(task.dueDate)}</span>
            </div>
            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-0.5">Expiring</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
