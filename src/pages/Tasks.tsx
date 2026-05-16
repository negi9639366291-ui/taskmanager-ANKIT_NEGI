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

import { Avatar } from '../components/Avatar';

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
    <div className="space-y-6 pb-12 font-sans text-slate-400">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight mb-1">Tactical Tasks</h1>
          <p className="text-slate-600 font-bold max-w-md text-[10px] uppercase tracking-widest leading-relaxed">
            Monitor work streams and optimize team throughput in real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/[0.03] p-1 rounded-lg border border-white/[0.05]">
            <button 
              onClick={() => setViewMode('KANBAN')}
              className={`p-2 rounded-md transition-all ${viewMode === 'KANBAN' ? 'bg-white/10 shadow-sm text-brand-400' : 'text-slate-600 hover:text-white'}`}
            >
              <Layout className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('LIST')}
              className={`p-2 rounded-md transition-all ${viewMode === 'LIST' ? 'bg-white/10 shadow-sm text-brand-400' : 'text-slate-600 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="h-9 px-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg shadow-lg transition-all flex items-center gap-2 group active:scale-95 text-[10px] uppercase tracking-[0.15em] border border-white/5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Node</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="relative flex-1 group w-full lg:w-auto">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/[0.02] rounded-lg flex items-center justify-center border border-white/[0.05] group-focus-within:bg-brand-500/10 transition-colors">
            <Search className="w-4 h-4 text-slate-600 group-focus-within:text-brand-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search tactical grid..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-13 pr-4 py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all font-bold text-xs text-white placeholder:text-slate-800 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
          <button 
            onClick={() => setSelectedStatus('ALL')}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border ${selectedStatus === 'ALL' ? 'bg-white text-black border-white shadow-xl shadow-white/5' : 'bg-white/[0.01] text-slate-600 border-white/[0.05] hover:border-white/[0.1] hover:text-slate-400'}`}
          >
            All Sectors
          </button>
          {statuses.map(status => (
            <button 
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border ${selectedStatus === status ? 'bg-white text-black border-white shadow-xl shadow-white/5' : 'bg-white/[0.01] text-slate-600 border-white/[0.05] hover:border-white/[0.1] hover:text-slate-400'}`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      {viewMode === 'KANBAN' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <LayoutGroup>
            {statuses.map(status => (
              <div key={status} className="flex flex-col gap-6">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_8px] ${
                      status === 'COMPLETED' ? 'bg-emerald-500 shadow-emerald-500/50' :
                      status === 'IN_PROGRESS' ? 'bg-brand-500 shadow-brand-500/50' :
                      'bg-slate-700 shadow-slate-700/50'
                    }`} />
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{status.replace('_', ' ')}</h3>
                    <div className="bg-white/[0.03] px-2 py-0.5 rounded text-[9px] font-black text-slate-600 border border-white/[0.05]">
                      {filteredTasks.filter(t => t.status === status).length}
                    </div>
                  </div>
                  <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-700 hover:text-white transition-all">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white/[0.01] rounded-2xl p-5 min-h-[600px] border border-white/[0.03] space-y-6 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
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
                      className="py-16 border-2 border-dashed border-white/[0.02] rounded-2xl flex flex-col items-center justify-center text-center group"
                    >
                      <div className="w-12 h-12 bg-white/[0.01] rounded-xl flex items-center justify-center border border-white/[0.03] mb-4 transition-all group-hover:scale-110">
                        <Zap className="w-5 h-5 text-slate-800" />
                      </div>
                      <p className="text-[9px] font-black text-slate-800 uppercase tracking-[0.3em]">Sector Clean</p>
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </LayoutGroup>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.01] rounded-2xl border border-white/[0.05] shadow-3xl overflow-hidden backdrop-blur-md"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/[0.05]">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Deployment</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Mission</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Unit</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] text-right">Window</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateTask(task.id, { status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' });
                          }}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            task.status === 'COMPLETED' ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'border-white/[0.1] group-hover:border-brand-500 bg-white/[0.02]'
                          }`}
                        >
                          {task.status === 'COMPLETED' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                        <div>
                          <p className={`text-xs font-bold tracking-tight transition-all ${task.status === 'COMPLETED' ? 'line-through text-slate-700' : 'text-white'}`}>
                            {task.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2 px-2.5 py-1 bg-white/[0.03] rounded-lg w-fit border border-white/[0.05]">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">
                          {projects.find(p => p.id === task.projectId)?.name || 'UNASSIGNED'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={team.find(u => u.id === task.assignedTo)?.name} size="xs" className="border border-white/5" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{team.find(u => u.id === task.assignedTo)?.name || 'NULL'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span className="text-[11px] font-black text-white italic uppercase tracking-tighter">{formatDate(task.dueDate)}</span>
                    </td>
                  </tr>
                ))}
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
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-dark-card border border-white/[0.05] w-full max-w-xl rounded-2xl shadow-3xl overflow-hidden"
            >
              <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white tracking-tighter leading-none">Initialize Tactical Node</h2>
                    <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em] mt-3">Specify operational parameters</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-3 hover:bg-white/5 rounded-xl text-slate-700 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Node Identification</label>
                    <input 
                      type="text" required
                      value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Title of tactical task..."
                      className="w-full px-5 py-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white/[0.04] transition-all font-bold text-white text-xs placeholder:text-slate-800 shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Node Briefing</label>
                    <textarea 
                      required
                      rows={3}
                      value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Operational details and constraints..."
                      className="w-full px-5 py-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white/[0.04] transition-all text-xs font-bold text-white resize-none placeholder:text-slate-800 shadow-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Assigned Mission</label>
                      <select 
                        required
                        value={newProjectId} onChange={(e) => setNewProjectId(e.target.value)}
                        className="w-full h-12 px-5 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 font-black text-slate-400 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%23475569%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat text-[10px] uppercase tracking-widest"
                      >
                        <option value="">GENERAL TASK</option>
                        {projects.map(p => <option key={p.id} value={p.id} className="bg-slate-900">{p.name.toUpperCase()}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Threat Level</label>
                      <select 
                        required
                        value={newPriority} onChange={(e) => setNewPriority(e.target.value as any)}
                        className="w-full h-12 px-5 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 font-black text-slate-400 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%23475569%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat text-[10px] uppercase tracking-widest"
                      >
                        <option value="LOW" className="bg-slate-900">DEFERRED</option>
                        <option value="MEDIUM" className="bg-slate-900">STANDARD</option>
                        <option value="HIGH" className="bg-slate-900">CRITICAL</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Unit Assignment</label>
                      <select 
                        required
                        value={newAssignedTo} onChange={(e) => setNewAssignedTo(e.target.value)}
                        className="w-full h-12 px-5 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 font-black text-slate-400 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%23475569%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat text-[10px] uppercase tracking-widest"
                      >
                        <option value="">SELECT UNIT</option>
                        {team.map(u => <option key={u.id} value={u.id} className="bg-slate-900">{u.name.toUpperCase()}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Target Window</label>
                      <input 
                        type="date" required
                        value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)}
                        className="w-full h-12 px-5 bg-white/[0.02] border border-white/[0.05] rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 font-black text-white text-[11px] uppercase tracking-widest shadow-sm"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-14 mt-8 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-brand-500/30 transition-all flex items-center justify-center gap-4 group active:scale-[0.98] border border-white/5"
                  >
                    <span>Deploy Tactical Node</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
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
      className="bg-white/[0.02] p-6 rounded-xl border border-white/[0.05] transition-all group flex flex-col relative overflow-hidden hover:bg-white/[0.04] hover:border-white/[0.1] hover:shadow-2xl hover:shadow-brand-500/5"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-2">
           <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.2em] border w-fit shadow-sm ${
            task.priority === 'HIGH' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-rose-500/5' :
            task.priority === 'MEDIUM' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-amber-500/5' :
            'bg-brand-500/10 text-brand-500 border-brand-500/20 shadow-brand-500/5'
          }`}>
            {task.priority}
          </div>
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest truncate max-w-[140px]">
            {project?.name || 'TACTICAL NEXUS'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={moveTask} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-700 hover:text-white transition-all border border-transparent hover:border-white/10">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <h4 className="text-sm font-bold text-white mb-2 tracking-tight leading-snug group-hover:text-brand-400 transition-colors">
        {task.title}
      </h4>
      <p className="text-[10px] font-bold text-slate-600 line-clamp-2 mb-6 leading-relaxed uppercase tracking-tight italic">
        {task.description}
      </p>

      <div className="mt-auto pt-4 border-t border-white/[0.03] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={member?.name} size="xs" className="border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity" />
          <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]">{member?.name.split(' ')[0]}</p>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-slate-700 font-black group-hover:text-slate-500 transition-colors">
            <Calendar className="w-3 h-3" />
            <span className="text-[9px] uppercase tracking-widest">{formatDate(task.dueDate)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
