/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Layout, 
  List, 
  Clock, 
  AlertCircle,
  MoreVertical,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { formatDate, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Task, TaskStatus, TaskPriority } from '../types';

export default function Tasks() {
  const { tasks, projects, team, addTask, updateTask, deleteTask } = useData();
  const { user } = useAuth();
  
  const [viewMode, setViewMode] = useState<'KANBAN' | 'LIST'>('KANBAN');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
    setNewDueDate('');
    setIsModalOpen(false);
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statuses: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tasks</h1>
          <p className="text-slate-500 font-medium">Coordinate your team effort and hit every milestone.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-xl border border-slate-200 flex items-center gap-1">
            <button 
              onClick={() => setViewMode('KANBAN')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'KANBAN' ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              )}
            >
              <Layout className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('LIST')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'LIST' ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              <Plus className="w-4 h-4" /> Create Task
            </button>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-600"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {statuses.map(status => (
            <button 
              key={status}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 whitespace-nowrap"
            >
              {status.replace('_', ' ')}
            </button>
          ))}
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {viewMode === 'KANBAN' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
          {statuses.map(status => (
            <div key={status} className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest">{status.replace('_', ' ')}</h3>
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full text-[10px] font-bold">
                    {filteredTasks.filter(t => t.status === status).length}
                  </span>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  status === 'COMPLETED' ? 'bg-emerald-400 shadow-[0_0_10px_#10b98140]' :
                  status === 'IN_PROGRESS' ? 'bg-blue-400 shadow-[0_0_10px_#60a5fa40]' :
                  'bg-slate-300 shadow-[0_0_10px_#cbd5e140]'
                }`}></div>
              </div>

              <div className="space-y-4 min-h-[400px]">
                {filteredTasks.filter(t => t.status === status).map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    team={team} 
                    updateTask={updateTask} 
                    isAdmin={isAdmin}
                  />
                ))}
                
                {filteredTasks.filter(t => t.status === status).length === 0 && (
                  <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center opacity-50">
                    <Clock className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Task</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Project</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Assignee</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Priority</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateTask(task.id, { status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' })}
                          className={cn(
                            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                            task.status === 'COMPLETED' ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 group-hover:border-indigo-500"
                          )}
                        >
                          {task.status === 'COMPLETED' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                        <div>
                          <p className={cn("text-sm font-bold uppercase tracking-tight", task.status === 'COMPLETED' ? "line-through text-slate-400" : "text-slate-900")}>
                            {task.title}
                          </p>
                          <p className="text-xs font-medium text-slate-400 mt-0.5 line-clamp-1">{task.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {projects.find(p => p.id === task.projectId)?.name}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                         <img 
                          src={team.find(u => u.id === task.assignedTo)?.avatar} 
                          className="w-6 h-6 rounded-full border border-slate-200" 
                          alt="Avatar"
                        />
                        <span className="text-sm font-bold text-slate-600">{team.find(u => u.id === task.assignedTo)?.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest ${
                        task.priority === 'HIGH' ? 'bg-red-50 text-red-600' :
                        task.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right font-bold text-sm text-slate-500">
                      {formatDate(task.dueDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <Plus className="text-indigo-600 w-6 h-6" />
                  </div>
                  New Task
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
                >
                  <Filter className="w-6 h-6 rotate-45" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Task Title</label>
                  <input 
                    type="text" required
                    value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Assign to Project</label>
                  <select 
                    required
                    value={newProjectId} onChange={(e) => setNewProjectId(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-600"
                  >
                    <option value="">Select a project</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Assigned To</label>
                    <select 
                      required
                      value={newAssignedTo} onChange={(e) => setNewAssignedTo(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-600"
                    >
                      <option value="">Choose member</option>
                      {team.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Priority</label>
                    <select 
                      required
                      value={newPriority} onChange={(e) => setNewPriority(e.target.value as any)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-600"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Due Date</label>
                  <input 
                    type="date" required
                    value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-600"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
                  >
                    Create Task <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
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
  updateTask: (id: string, updates: Partial<Task>) => void;
  isAdmin: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, team, updateTask, isAdmin }) => {
  const member = team.find(u => u.id === task.assignedTo);
  
  const moveTask = () => {
    const sequence: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'PENDING'];
    const nextIdx = sequence.indexOf(task.status) + 1;
    updateTask(task.id, { status: sequence[nextIdx] });
  };

  return (
    <motion.div 
      layout
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col min-h-32"
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-widest ${
          task.priority === 'HIGH' ? 'bg-red-50 text-red-600 border border-red-100' :
          task.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
          'bg-blue-50 text-blue-600 border border-blue-100'
        }`}>
          {task.priority}
        </span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={moveTask} className="p-1 px-2 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold hover:bg-indigo-100 transition-colors flex items-center gap-1">
            Move <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <h4 className="text-sm font-bold text-slate-900 mb-1 uppercase tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
        {task.title}
      </h4>
      <p className="text-[11px] font-medium text-slate-400 line-clamp-2 mb-4 leading-relaxed">
        {task.description}
      </p>

      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={member?.avatar} className="w-6 h-6 rounded-full border border-slate-100 shadow-sm" alt="Assignee" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{member?.name.split(' ')[0]}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold">{formatDate(task.dueDate)}</span>
        </div>
      </div>
    </motion.div>
  );
}
