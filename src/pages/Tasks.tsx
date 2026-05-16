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
    <div className="space-y-6 pb-12 font-sans text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight mb-1">Operations Backlog</h1>
          <p className="text-slate-500 font-medium max-w-md text-sm leading-relaxed">
            Monitor work streams and optimize squad throughput in real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('KANBAN')}
              className={`p-2 rounded-md transition-all ${viewMode === 'KANBAN' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-400 hover:text-slate-900'}`}
            >
              <Layout className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('LIST')}
              className={`p-2 rounded-md transition-all ${viewMode === 'LIST' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-400 hover:text-slate-900'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="h-9 px-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 group active:scale-95 text-[11px] uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              <span>Deploy Task</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="relative flex-1 group w-full lg:w-auto">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-focus-within:bg-brand-50 transition-colors">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search objectives..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-13 pr-4 py-2 bg-white border border-slate-200/60 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all font-medium text-slate-600 text-sm shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
          <button 
            onClick={() => setSelectedStatus('ALL')}
            className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${selectedStatus === 'ALL' ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
          >
            All Sectors
          </button>
          {statuses.map(status => (
            <button 
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${selectedStatus === status ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      {viewMode === 'KANBAN' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LayoutGroup>
            {statuses.map(status => (
              <div key={status} className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      status === 'COMPLETED' ? 'bg-emerald-500' :
                      status === 'IN_PROGRESS' ? 'bg-brand-500' :
                      'bg-slate-300'
                    }`} />
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{status.replace('_', ' ')}</h3>
                    <div className="bg-slate-100 px-1.5 py-0.5 rounded-md text-[9px] font-bold text-slate-400 border border-slate-200/50">
                      {filteredTasks.filter(t => t.status === status).length}
                    </div>
                  </div>
                  <button className="p-1 hover:bg-slate-100 rounded-md text-slate-300 hover:text-slate-600 transition-all">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-slate-50/50 rounded-xl p-4 min-h-[500px] border border-slate-200/60 space-y-4 relative overflow-hidden">
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
                      className="py-12 border-2 border-dashed border-slate-200/50 rounded-xl flex flex-col items-center justify-center text-center opacity-30"
                    >
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sector Clear</p>
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </LayoutGroup>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Objective</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Context</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/70 transition-colors group cursor-pointer">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateTask(task.id, { status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' });
                          }}
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                            task.status === 'COMPLETED' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 group-hover:border-brand-500 bg-white'
                          }`}
                        >
                          {task.status === 'COMPLETED' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                        <div>
                          <p className={`text-xs font-bold transition-all ${task.status === 'COMPLETED' ? 'line-through text-slate-300' : 'text-slate-900'}`}>
                            {task.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100/50 rounded-lg w-fit border border-slate-100">
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">
                          {projects.find(p => p.id === task.projectId)?.name || 'Nexus'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md overflow-hidden border border-slate-100">
                           <img 
                            src={team.find(u => u.id === task.assignedTo)?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo}`} 
                            className="w-full h-full object-cover"
                            alt="Avatar"
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600">{team.find(u => u.id === task.assignedTo)?.name || 'Unassigned'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span className="text-[11px] font-bold text-slate-900 italic">{formatDate(task.dueDate)}</span>
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
              className="relative bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Deploy Task</h2>
                    <p className="text-slate-400 text-xs font-medium mt-1">Specify parameters for squad engagement.</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Objective Title</label>
                    <input 
                      type="text" required
                      value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Title..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all font-medium text-slate-800 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Contextual Intel</label>
                    <textarea 
                      required
                      rows={3}
                      value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Details..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 focus:bg-white transition-all text-sm font-medium resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Project</label>
                      <select 
                        required
                        value={newProjectId} onChange={(e) => setNewProjectId(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:text-sm font-bold text-slate-600 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem_1rem] bg-[right_1rem_center] bg-no-repeat text-xs"
                      >
                        <option value="">Nexus</option>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Priority</label>
                      <select 
                        required
                        value={newPriority} onChange={(e) => setNewPriority(e.target.value as any)}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:text-sm font-bold text-slate-600 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem_1rem] bg-[right_1rem_center] bg-no-repeat text-xs"
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Assignee</label>
                      <select 
                        required
                        value={newAssignedTo} onChange={(e) => setNewAssignedTo(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:text-sm font-bold text-slate-600 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem_1rem] bg-[right_1rem_center] bg-no-repeat text-xs"
                      >
                        <option value="">Asset</option>
                        {team.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Deadline</label>
                      <input 
                        type="date" required
                        value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:text-sm font-bold text-slate-700 text-xs"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-11 mt-4 bg-slate-900 hover:bg-brand-600 text-white rounded-lg font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Deploy Tactical Objective</span>
                    <ArrowRight className="w-4 h-4" />
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
      className="bg-white p-4 rounded-xl border border-slate-200/60 transition-all group flex flex-col relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col gap-1">
           <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border w-fit ${
            task.priority === 'HIGH' ? 'bg-red-50 text-red-600 border-red-100' :
            task.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-600 border-amber-100' :
            'bg-brand-50 text-brand-600 border-brand-100'
          }`}>
            {task.priority}
          </div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider truncate max-w-[120px]">
            {project?.name || 'Tactical Nexus'}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button onClick={moveTask} className="p-1 hover:bg-slate-50 rounded text-slate-300 hover:text-brand-600 transition-all border border-transparent hover:border-slate-100">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <h4 className="text-xs font-bold text-slate-900 mb-1 tracking-tight leading-snug">
        {task.title}
      </h4>
      <p className="text-[10px] font-medium text-slate-400 line-clamp-2 mb-4 leading-normal italic">
        {task.description}
      </p>

      <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg overflow-hidden border border-slate-100">
            <img 
              src={member?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo}`} 
              className="w-full h-full object-cover" 
              alt="Avatar" 
            />
          </div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{member?.name.split(' ')[0]}</p>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-slate-400 font-bold">
            <Calendar className="w-3 h-3" />
            <span className="text-[9px] uppercase tracking-tighter">{formatDate(task.dueDate)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
