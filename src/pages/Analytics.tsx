import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { useData } from '../context/DataContext';
import { motion } from 'motion/react';
import { Avatar } from '../components/Avatar';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Target, 
  Zap, 
  ArrowUpRight, 
  Calendar,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Analytics() {
  const { tasks, projects, team } = useData();

  // Task Status Distribution
  const statusData = [
    { name: 'Backlog', value: tasks.filter(t => t.status === 'PENDING').length },
    { name: 'Active', value: tasks.filter(t => t.status === 'IN_PROGRESS').length },
    { name: 'Shipped', value: tasks.filter(t => t.status === 'COMPLETED').length },
  ];

  // Projects Progress
  const projectData = projects.map(p => {
    const projectTasks = tasks.filter(t => t.projectId === p.id);
    const completed = projectTasks.filter(t => t.status === 'COMPLETED').length;
    const progress = projectTasks.length > 0 ? Math.round((completed / projectTasks.length) * 100) : 0;
    return { name: p.name.substring(0, 15), progress };
  });

  // Team Productivity
  const teamData = team.map(member => {
    const completed = tasks.filter(t => t.assignedTo === member.id && t.status === 'COMPLETED').length;
    const total = tasks.filter(t => t.assignedTo === member.id).length;
    return { 
      name: member.name.split(' ')[0], 
      fullName: member.name,
      completed, 
      total,
      productivity: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  });

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-display font-bold text-slate-900 tracking-tight mb-1">Analytics</h1>
          <p className="text-slate-500 font-medium max-w-md text-xs leading-relaxed">
            High-fidelity data visualization for your projects and velocity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg">
             <button className="h-8 px-3 bg-white shadow-sm text-[10px] font-bold uppercase tracking-wider text-slate-800 rounded-md">Last 30 Days</button>
             <button className="h-8 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-colors">Quarterly</button>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Velocity', value: '84.2%', icon: Zap, color: 'text-brand-600', bg: 'bg-brand-50', trend: '+5.4%' },
          { label: 'Completion', value: '72%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+12%' },
          { label: 'Lead Time', value: '3.5d', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', trend: '-0.5d' },
          { label: 'Blockers', value: '4', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', trend: 'Active' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center ${stat.color} group-hover:scale-105 transition-transform`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : stat.trend === 'Active' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
                {stat.trend}
              </div>
            </div>
            <p className="text-xl font-bold text-slate-900 leading-none">{stat.value}</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Target Progress */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Project Momentum</h3>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Velocity per asset</p>
            </div>
            <Target className="w-5 h-5 text-brand-600 opacity-20" />
          </div>
          
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectData}>
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 700 }}
                  domain={[0, 100]}
                />
                <RechartsTooltip 
                   cursor={{ stroke: '#6366f1', strokeWidth: 1 }}
                   contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: 'none', 
                    borderRadius: '0.75rem',
                    color: '#fff',
                    padding: '0.75rem',
                  }}
                  itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontSize: '9px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="progress" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorProgress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Task Allocation */}
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Resource Allocation</h3>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Status distribution</p>
            </div>
            <Layers className="w-5 h-5 text-brand-600 opacity-20" />
          </div>
          
          <div className="h-[220px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={8}
                  dataKey="value"
                  animationBegin={200}
                >
                  {statusData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={8} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: 'none', 
                    borderRadius: '0.75rem',
                    color: '#fff',
                    padding: '0.5rem',
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  align="center" 
                  iconType="circle"
                  formatter={(value) => <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Leaderboard */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Squad Efficiency</h3>
            <button className="flex items-center gap-1.5 text-[9px] font-black text-brand-600 uppercase tracking-widest hover:text-brand-700 transition-colors">
              Full Report <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-5">
            {teamData.sort((a, b) => b.productivity - a.productivity).map((m, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="text-xs font-bold text-slate-300 w-4">{i + 1}</div>
                <Avatar name={m.fullName} size="sm" className="rounded-lg shadow-sm" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{m.name}</span>
                    <span className="text-[10px] font-black text-slate-900">{m.productivity}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${m.productivity}%` }}
                      className={`h-full rounded-full bg-brand-600`}
                    />
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-xs font-bold text-slate-900 leading-none">{m.completed}</p>
                   <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Shipped</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Overview */}
        <div className="bg-slate-900 p-6 rounded-xl text-white relative overflow-hidden flex flex-col shadow-lg shadow-slate-900/20">
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center mb-6">
              <Zap className="w-4 h-4 text-brand-400" />
            </div>
            <h3 className="text-lg font-bold mb-3 italic">Strategic Summary</h3>
            <p className="text-slate-400 font-medium mb-6 leading-relaxed text-[11px]">
              Overall team efficiency is <span className="text-white font-bold">14% higher</span> than the industry baseline. 
            </p>
            
            <div className="space-y-3 mb-auto">
              <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">Peak Performance Detected</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">3 Deadlines Approaching</span>
              </div>
            </div>

            <button className="w-full h-9 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all mt-8 flex items-center justify-center gap-2">
              Export PDF <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
