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
    <div className="space-y-6 pb-12 font-sans text-slate-400">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight mb-1 italic">Intelligence</h1>
          <p className="text-slate-600 font-bold max-w-md text-[10px] uppercase tracking-[0.2em] leading-relaxed">
            High-fidelity data visualization for your projects and velocity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/[0.03] border border-white/[0.05] p-1.5 rounded-xl shadow-inner shadow-black/20">
             <button className="h-8 px-4 bg-white/[0.05] shadow-lg text-[10px] font-black uppercase tracking-[0.15em] text-white rounded-lg">Last 30 Cycles</button>
             <button className="h-8 px-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 hover:text-slate-500 transition-colors">Quarterly</button>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Force', value: '84.2%', icon: Zap, color: 'text-brand-400', bg: 'bg-brand-500/10', trend: '+5.4%' },
          { label: 'Node Success', value: '72%', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', trend: '+12%' },
          { label: 'Sync Time', value: '3.5d', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10', trend: '-0.5d' },
          { label: 'Obstructions', value: '4', icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10', trend: 'Critical' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/[0.02] p-6 rounded-2xl border border-white/[0.05] shadow-xl transition-all group hover:bg-white/[0.04] backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-5">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color} border border-white/[0.05] group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-colors ${stat.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : stat.trend === 'Critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-white/5 text-slate-600 border-white/5'}`}>
                {stat.trend}
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-white leading-none tracking-tighter">{stat.value}</p>
            <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.25em] mt-2.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Target Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/[0.05] shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-display font-bold text-white tracking-tight">Deployment Flux</h3>
              <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] mt-1.5">Tactical velocity matrix</p>
            </div>
            <div className="p-3 bg-brand-500/10 rounded-2xl border border-brand-500/20">
              <Target className="w-5 h-5 text-brand-400" />
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectData}>
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#334155', fontSize: 9, fontWeight: 900, textAnchor: 'middle' }}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#334155', fontSize: 9, fontWeight: 900 }}
                  domain={[0, 100]}
                />
                <RechartsTooltip 
                   cursor={{ stroke: '#6366f133', strokeWidth: 2 }}
                   contentStyle={{ 
                    backgroundColor: '#0b0b0f', 
                    border: '1px solid rgba(255,255,255,0.05)', 
                    borderRadius: '1rem',
                    color: '#fff',
                    padding: '1rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                  itemStyle={{ color: '#6366f1', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase' }}
                  labelStyle={{ color: '#475569', marginBottom: '8px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                />
                <Area type="monotone" dataKey="progress" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorProgress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Task Allocation */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/[0.05] shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-display font-bold text-white tracking-tight">Mass Distribution</h3>
              <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] mt-1.5">Status allocation clusters</p>
            </div>
            <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20">
              <Layers className="w-5 h-5 text-violet-400" />
            </div>
          </div>
          
          <div className="h-[240px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={10}
                  dataKey="value"
                  animationBegin={200}
                >
                  {statusData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={12} stroke="rgba(255,255,255,0.05)" strokeWidth={2} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#0b0b0f', 
                    border: '1px solid rgba(255,255,255,0.05)', 
                    borderRadius: '1rem',
                    color: '#fff',
                    padding: '0.75rem',
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  align="center" 
                  iconType="circle"
                  formatter={(value) => <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Leaderboard */}
        <div className="lg:col-span-2 bg-white/[0.02] p-8 rounded-[2rem] border border-white/[0.05] shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-display font-bold text-white tracking-tight italic">Unit Efficiency</h3>
            <button className="flex items-center gap-2.5 text-[10px] font-black text-brand-400 uppercase tracking-[0.25em] hover:text-brand-300 transition-all group/link">
              Satellite Report <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="grid gap-8">
            {teamData.sort((a, b) => b.productivity - a.productivity).map((m, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className="text-[10px] font-black text-slate-800 w-4 tracking-tighter">0{i + 1}</div>
                <Avatar name={m.fullName} size="md" className="rounded-2xl border border-white/5 shadow-2xl group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-white uppercase tracking-[0.1em] group-hover:text-brand-400 transition-colors">{m.name}</span>
                    <span className="text-[10px] font-black text-brand-500 tabular-nums">{m.productivity}%</span>
                  </div>
                  <div className="h-2 bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.05]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${m.productivity}%` }}
                      className={`h-full rounded-full bg-brand-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`}
                    />
                  </div>
                </div>
                <div className="text-right pl-4 border-l border-white/5">
                   <p className="text-lg font-display font-bold text-white leading-none tabular-nums">{m.completed}</p>
                   <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mt-1">Shipped</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Overview */}
        <div className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/[0.05] shadow-2xl relative overflow-hidden flex flex-col backdrop-blur-md">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center mb-8 border border-brand-500/20">
              <Zap className="w-6 h-6 text-brand-400" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4 tracking-tighter text-white">Strategic Vector</h3>
            <p className="text-slate-600 font-bold mb-10 leading-relaxed text-[11px] uppercase tracking-widest">
              Unit efficiency is currently <span className="text-emerald-400 font-black">1.14x higher</span> than industry standard baselines. 
            </p>
            
            <div className="space-y-4 mb-auto">
              <div className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/[0.05] hover:bg-white/[0.05] transition-colors">
                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Peak Cycles Identified</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/[0.05] hover:bg-white/[0.05] transition-colors">
                <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">3 Nodes Pending Sync</span>
              </div>
            </div>

            <button className="w-full h-12 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] transition-all mt-12 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(99,102,241,0.2)]">
              Export Intel <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
