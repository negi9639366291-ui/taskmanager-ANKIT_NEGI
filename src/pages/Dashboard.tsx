import React from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Target,
  Calendar,
  Layers,
  ArrowRight,
  Plus
} from 'lucide-react';
import { 
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
import { motion } from 'motion/react';
import { format } from 'date-fns';

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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const { tasks, projects, team, activities } = useData();
  const { user } = useAuth();

  const stats = [
    { 
      label: 'Active Projects', 
      value: projects.filter(p => p.status === 'ACTIVE').length, 
      icon: Briefcase, 
      color: 'text-brand-600', 
      bg: 'bg-brand-50',
      gradient: 'from-brand-500/10 to-transparent',
      trend: '+12%',
      description: 'Projects in motion'
    },
    { 
      label: 'Tasks Completed', 
      value: tasks.filter(t => t.status === 'COMPLETED').length, 
      icon: CheckCircle2, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50',
      gradient: 'from-emerald-500/10 to-transparent',
      trend: '+24%',
      description: 'Efficiency peak'
    },
    { 
      label: 'Awaiting Action', 
      value: tasks.filter(t => t.status === 'PENDING' || t.status === 'IN_PROGRESS').length, 
      icon: Clock, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50',
      gradient: 'from-amber-500/10 to-transparent',
      trend: '-5%',
      description: 'Pending review'
    },
    { 
      label: 'Productivity', 
      value: '94%', 
      icon: TrendingUp, 
      color: 'text-violet-600', 
      bg: 'bg-violet-50',
      gradient: 'from-violet-500/10 to-transparent',
      trend: '+2%',
      description: 'Team velocity'
    },
  ];

  const chartData = [
    { name: 'Mon', value: 45 },
    { name: 'Tue', value: 52 },
    { name: 'Wed', value: 38 },
    { name: 'Thu', value: 65 },
    { name: 'Fri', value: 48 },
    { name: 'Sat', value: 24 },
    { name: 'Sun', value: 32 },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-900">
      {/* Welcome Hero */}
      <section className="relative overflow-hidden rounded-xl bg-slate-900 px-6 py-6 md:px-8 md:py-8 shadow-sm">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-600/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 backdrop-blur-md rounded-md text-brand-400 text-[8px] font-bold uppercase tracking-widest mb-3 border border-white/5"
          >
            <span className="w-1 h-1 bg-brand-500 rounded-full animate-pulse"></span>
            Operational Status: Online
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl font-display font-bold text-white mb-2 tracking-tight"
          >
            Welcome back, <span className="text-brand-400">{user?.name.split(' ')[0]}</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-400 text-xs mb-5 max-w-lg leading-relaxed"
          >
            Efficiency is up <span className="text-white font-bold">12%</span>. There are 5 high-priority objectives targeting this sprint.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2.5"
          >
            <button className="h-8 px-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 group active:scale-95 text-[10px] uppercase tracking-wider">
              Manage Tasks
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="h-8 px-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg backdrop-blur-md border border-white/10 transition-all text-[10px] uppercase tracking-wider">
              Team Status
            </button>
          </motion.div>
        </div>
      </section>

      {/* KPI Stats */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className="group relative bg-white p-5 rounded-xl border border-slate-200/60 transition-all duration-200"
          >
            <div className="relative z-10 text-left">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} p-2.5 rounded-lg ${stat.color} transition-transform`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'} flex items-center gap-0.5`}>
                  {stat.trend}
                </div>
              </div>
              <p className="text-xl font-display font-bold text-slate-900 tracking-tight mb-0.5">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Productivity Area Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-none">Velocity Intel</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">Weekly output distribution</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button className="px-4 py-1.5 bg-white shadow-sm rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-900">Objectives</button>
              <button className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900">Throughput</button>
            </div>
          </div>
          
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
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
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '0.75rem', 
                    border: 'none', 
                    padding: '1rem',
                    color: '#fff'
                  }}
                  itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Activity & Stats */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          {/* Target Progress */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 p-5 rounded-xl text-white shadow-sm relative overflow-hidden group"
          >
            <h4 className="text-sm font-bold mb-0.5 relative z-10 italic">Quarterly Target</h4>
            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-6 relative z-10">Success Metrics</p>
            
            <div className="relative z-10 mb-5">
               <div className="flex justify-between items-end mb-2">
                 <span className="text-xl font-bold">84%</span>
                 <span className="text-[8px] font-bold text-brand-400 uppercase tracking-widest">Optimized</span>
               </div>
               <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: '84%' }}
                   transition={{ duration: 1, ease: 'easeOut' }}
                   className="h-full bg-brand-500 rounded-full"
                />
              </div>
            </div>
            
            <div className="flex justify-between text-[8px] font-bold text-slate-500 relative z-10 uppercase tracking-widest">
              <span>Goal: 100 Missions</span>
              <span className="text-white">16 Left</span>
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex-1 flex flex-col"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-slate-900">Live Pulse</h3>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-brand-50 text-brand-600 rounded text-[8px] font-bold uppercase tracking-wider">
                <span className="w-1 h-1 bg-brand-500 rounded-full animate-pulse"></span>
                Event Log
              </div>
            </div>
            <div className="space-y-5 flex-1">
              {activities.slice(0, 3).map((activity, idx) => {
                const actor = team.find(u => u.id === activity.userId);
                return (
                  <div key={idx} className="flex gap-2.5 group">
                    <div className="relative flex-shrink-0">
                      <div className="w-7 h-7 rounded-lg overflow-hidden border border-slate-100 shadow-sm">
                        <img 
                           src={actor?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.userId}`} 
                           className="w-full h-full object-cover" 
                           alt="User"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-slate-900 leading-none mb-1 truncate">
                        {actor?.name || 'Operative'}
                      </p>
                      <p className="text-[9px] font-medium text-slate-400 capitalize">{activity.action}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="w-full mt-5 py-1.5 bg-slate-50 hover:bg-slate-100 text-[9px] font-bold text-slate-500 rounded-lg transition-all uppercase tracking-widest">
              Full Archive
            </button>
          </motion.div>
        </div>
      </div>

      {/* Projects Overview Row */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
            <div>
              <h3 className="text-base font-bold text-slate-900">Projects Overview</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Real-time status</p>
            </div>
            <button className="w-8 h-8 bg-slate-50 hover:bg-brand-500 hover:text-white rounded-lg transition-all flex items-center justify-center text-slate-400 shadow-sm active:scale-95">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Squad</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/60">
                {projects.slice(0, 4).map((project, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/5 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-bold group-hover:bg-brand-50 group-hover:text-brand-500 transition-colors">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{project.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">Updated 2h ago</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24">
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-brand-500 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-1.5">
                        {[1, 2, 3].map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-md bg-slate-200 border border-white flex items-center justify-center overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=u${i + idx}`} alt="user" />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        project.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {project.status === 'ACTIVE' ? 'Active' : 'Standby'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Small Analytics Widget */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center group">
          <div className="w-16 h-16 rounded-full border-[4px] border-slate-50 flex items-center justify-center mb-4 relative">
             <svg className="w-full h-full absolute -rotate-90 p-0.5">
                <circle 
                   cx="31" cy="31" r="28" 
                   fill="none" stroke="currentColor" 
                   strokeWidth="4" 
                   className="text-brand-500"
                   strokeDasharray="176"
                   strokeDashoffset="50"
                   style={{ transform: 'translate(1px, 1px)' }}
                />
             </svg>
             <span className="text-base font-bold text-slate-900 group-hover:scale-110 transition-transform">72%</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">Team Efficiency</h4>
          <p className="text-[10px] font-medium text-slate-400 mb-5 leading-relaxed max-w-[200px]">Throughput across all active members.</p>
          <div className="flex gap-2 w-full">
            <div className="flex-1 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 text-center">Tasks</p>
              <p className="text-base font-bold text-slate-900 text-center">128</p>
            </div>
            <div className="flex-1 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 text-center">Risks</p>
              <p className="text-base font-bold text-red-600 text-center">04</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
