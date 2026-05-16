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
      completed, 
      total,
      productivity: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  });

  return (
    <div className="space-y-10 pb-20 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">Intelligence</h1>
          <p className="text-slate-500 font-medium max-w-lg">
            High-fidelity data visualization for your projects. Track velocity, completion rates, and mission success.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
             <button className="px-4 py-2 bg-white shadow-sm text-xs font-black uppercase tracking-widest text-slate-800 rounded-lg">Last 30 Days</button>
             <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600">Quarterly</button>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg Velocity', value: '84.2%', icon: Zap, color: 'text-brand-600', bg: 'bg-brand-50', trend: '+5.4%' },
          { label: 'Completion', value: '72%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+12%' },
          { label: 'Lead Time', value: '3.5d', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', trend: '-0.5d' },
          { label: 'Blockers', value: '4', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', trend: 'Active' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-7 rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : stat.trend === 'Active' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
                {stat.trend}
              </div>
            </div>
            <p className="text-3xl font-display font-black text-slate-900 leading-none">{stat.value}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Target Progress */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">Project Momentum</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Completion trajectory PER ASSET</p>
            </div>
            <Target className="w-8 h-8 text-brand-600 opacity-20" />
          </div>
          
          <div className="h-[350px] w-full">
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
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                  domain={[0, 100]}
                />
                <RechartsTooltip 
                   cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                   contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: 'none', 
                    borderRadius: '1.5rem',
                    color: '#fff',
                    padding: '1.5rem',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '8px', fontSize: '10px', fontWeight: 'black', textTransform: 'uppercase' }}
                />
                <Area type="monotone" dataKey="progress" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorProgress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Task Allocation */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">Resource Allocation</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Status distribution frequency</p>
            </div>
            <Layers className="w-8 h-8 text-brand-600 opacity-20" />
          </div>
          
          <div className="h-[350px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                  animationBegin={200}
                >
                  {statusData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={12} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: 'none', 
                    borderRadius: '1.5rem',
                    color: '#fff',
                    padding: '1rem',
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  align="center" 
                  iconType="circle"
                  formatter={(value) => <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Leaderboard */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">Squad Efficiency</h3>
            <button className="flex items-center gap-2 text-[10px] font-black text-brand-600 uppercase tracking-widest hover:text-brand-700">
              Full Report <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-6">
            {teamData.sort((a, b) => b.productivity - a.productivity).map((m, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className="text-sm font-black text-slate-300 group-hover:text-brand-500 transition-colors w-4">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{m.name}</span>
                    <span className="text-xs font-black text-slate-900">{m.productivity}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${m.productivity}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${m.productivity > 80 ? 'from-emerald-400 to-emerald-600' : 'from-brand-500 to-indigo-600'}`}
                    />
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-sm font-black text-slate-900">{m.completed}</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Shipped</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Overview */}
        <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white relative overflow-hidden flex flex-col shadow-2xl shadow-slate-900/20">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl -mr-20 -mt-20 anim-pulse"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
              <Zap className="w-6 h-6 text-brand-400" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4 italic">Strategic Summary</h3>
            <p className="text-slate-400 font-medium mb-10 leading-relaxed">
              Your overall team efficiency is currently <span className="text-white font-bold">14% higher</span> than the industry baseline for Q2 teams. 
            </p>
            
            <div className="space-y-4 mb-auto">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-300">Peak Performance Detected</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-300">3 Deadlines Approaching</span>
              </div>
            </div>

            <button className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all mt-10 shadow-xl shadow-brand-600/10 active:scale-95 flex items-center justify-center gap-2">
              Generate PDF Export <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
