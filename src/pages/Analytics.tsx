/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { useData } from '../context/DataContext';
import { motion } from 'motion/react';
import { TrendingUp, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Analytics() {
  const { tasks, projects, team } = useData();

  // Task Status Distribution
  const statusData = [
    { name: 'Pending', value: tasks.filter(t => t.status === 'PENDING').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'IN_PROGRESS').length },
    { name: 'Completed', value: tasks.filter(t => t.status === 'COMPLETED').length },
  ];

  // Projects Progress
  const projectData = projects.map(p => {
    const projectTasks = tasks.filter(t => t.projectId === p.id);
    const completed = projectTasks.filter(t => t.status === 'COMPLETED').length;
    const progress = projectTasks.length > 0 ? Math.round((completed / projectTasks.length) * 100) : 0;
    return { name: p.name.substring(0, 10), progress };
  });

  // Team Productivity (Tasks completed per member)
  const teamData = team.map(member => {
    const completed = tasks.filter(t => t.assignedTo === member.id && t.status === 'COMPLETED').length;
    return { name: member.name.split(' ')[0], completed };
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics Dashboard</h1>
        <p className="text-slate-500 font-medium">Deep dive into your team performance and project metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Efficiency</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 leading-none">84.2%</p>
          <p className="text-xs font-bold text-emerald-500 mt-2">+5.4% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Completion rate</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 leading-none">72%</p>
          <p className="text-xs font-bold text-emerald-500 mt-2">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg. cycle time</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 leading-none">3.5d</p>
          <p className="text-xs font-bold text-red-500 mt-2">+0.5d from last month</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 rounded-xl text-red-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">At risk tasks</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 leading-none">4</p>
          <p className="text-xs font-bold text-slate-400 mt-2">Requires attention</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Task Distribution */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-tight">Task Distribution</h3>
          <div className="h-[300px] w-full flex flex-col md:flex-row items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Progress */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-tight">Project Momentum</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  domain={[0, 100]}
                />
                <Tooltip 
                   cursor={{ fill: '#f8fafc' }}
                   contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="progress" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Productivity */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-tight">Leaderboard (Completed Tasks)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={teamData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Line type="step" dataKey="completed" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-center">
          <div className="relative z-10 text-white">
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Performance Summary</h3>
            <p className="text-indigo-100 mb-8 font-medium leading-relaxed">
              Your team is currently over-performing by <span className="font-bold text-white">12%</span> compared to the previous sprint. Focus on the high-priority tasks in "Website Redesign" to maintain this momentum.
            </p>
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-lg">
              Download Full PDF
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/30 rounded-full -ml-10 -mb-10 blur-xl"></div>
        </div>
      </div>
    </div>
  );
}
