/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  MoreHorizontal
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../lib/utils';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { tasks, projects, team, activities } = useData();
  const { user } = useAuth();

  const stats = [
    { 
      label: 'Active Projects', 
      value: projects.filter(p => p.status === 'ACTIVE').length, 
      icon: Briefcase, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      trend: '+12%'
    },
    { 
      label: 'Completed Tasks', 
      value: tasks.filter(t => t.status === 'COMPLETED').length, 
      icon: CheckCircle2, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50',
      trend: '+24%'
    },
    { 
      label: 'Pending Tasks', 
      value: tasks.filter(t => t.status === 'PENDING' || t.status === 'IN_PROGRESS').length, 
      icon: Clock, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50',
      trend: '-5%'
    },
    { 
      label: 'Team Size', 
      value: team.length, 
      icon: AlertCircle, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50',
      trend: '0%'
    },
  ];

  const chartData = [
    { name: 'Mon', tasks: 4 },
    { name: 'Tue', tasks: 7 },
    { name: 'Wed', tasks: 5 },
    { name: 'Thu', tasks: 8 },
    { name: 'Fri', tasks: 12 },
    { name: 'Sat', tasks: 3 },
    { name: 'Sun', tasks: 2 },
  ];

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Good morning, {user?.name.split(' ')[0]}!</h1>
          <p className="text-slate-500 font-medium">Here is what is happening with your projects today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            Export Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            Share Link
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} p-3 rounded-2xl`}>
                <stat.icon className={`${stat.color} w-6 h-6`} />
              </div>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : stat.trend.startsWith('-') ? 'text-red-500' : 'text-slate-400'} flex items-center`}>
                {stat.trend} <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Productivity Chart */}
        <div className="xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 leading-none">Team Productivity</h3>
              <p className="text-sm font-medium text-slate-400 mt-2">Tasks completed over the last 7 days</p>
            </div>
            <select className="bg-slate-50 border-none text-sm font-bold text-slate-600 focus:ring-0 rounded-lg p-2">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff',
                    padding: '12px'
                  }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ stroke: '#4f46e5', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="tasks" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorTasks)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-6 flex-1">
            {activities.length > 0 ? activities.slice(0, 6).map((activity, idx) => (
              <div key={idx} className="flex gap-4 relative">
                {idx !== activities.slice(0, 6).length - 1 && (
                  <div className="absolute top-8 left-[1.125rem] bottom-0 w-px bg-slate-100"></div>
                )}
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 z-10 border-4 border-white">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 leading-tight">
                    <span className="font-bold text-slate-900">{team.find(u => u.id === activity.userId)?.name}</span> {activity.action}
                  </p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{formatDate(activity.createdAt)}</p>
                </div>
              </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 grayscale opacity-40">
                <Clock className="w-12 h-12 text-slate-200 mb-4" />
                <p className="text-slate-400 font-bold">No recent activity</p>
              </div>
            )}
          </div>
          <button className="mt-8 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            View all activity
          </button>
        </div>
      </div>

      {/* Task Overview */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Task Overview</h3>
          <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Task Details</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Assignee</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Priority</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTasks.map((task, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{task.title}</p>
                    <p className="text-xs font-medium text-slate-400 mt-0.5 line-clamp-1">{task.description}</p>
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
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        task.status === 'COMPLETED' ? 'bg-emerald-500' :
                        task.status === 'IN_PROGRESS' ? 'bg-blue-500' :
                        'bg-slate-300'
                      }`}></div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{task.status.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="text-sm font-bold text-slate-500">{formatDate(task.dueDate)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
