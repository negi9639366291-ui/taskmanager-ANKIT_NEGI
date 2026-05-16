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
    <div className="space-y-10 pb-20 font-sans">
      {/* Welcome Hero */}
      <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 px-8 py-12 md:px-14 md:py-20 shadow-2xl shadow-slate-900/20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-600/20 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full text-brand-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/5"
          >
            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
            Operational Status: Optimized
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-display font-black text-white mb-8 leading-[0.9] tracking-tighter"
          >
            Welcome back, <br/>
            <span className="text-brand-400 italic">{user?.name.split(' ')[0]}</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl mb-10 max-w-lg leading-relaxed font-medium"
          >
            Tactical efficiency is up <span className="text-white font-bold">12%</span> this sprint. You have 5 high-priority objectives requiring immediate attention.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-black rounded-2xl shadow-xl shadow-brand-500/20 transition-all flex items-center gap-3 group active:scale-95 text-xs uppercase tracking-widest">
              Review Backlog
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl backdrop-blur-md border border-white/10 transition-all text-xs uppercase tracking-widest">
              Squad Status
            </button>
          </motion.div>
        </div>
      </section>

      {/* KPI Stats */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]`} />
            <div className="relative z-10 text-left">
              <div className="flex justify-between items-start mb-8">
                <div className={`${stat.bg} p-4 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'} flex items-center gap-1`}>
                  {stat.trend}
                  <TrendingUp className="w-3 h-3" />
                </div>
              </div>
              <p className="text-4xl font-display font-black text-slate-900 tracking-tight mb-1">{stat.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-[10px] font-bold text-slate-900/40 mt-3 italic">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Productivity Area Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 bg-white p-10 rounded-[3.5rem] border border-slate-200/60 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
            <div>
              <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">Velocity Intel</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Activity metrics per temporal window</p>
            </div>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl">
              <button className="px-6 py-2 bg-white shadow-sm rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 transition-all">Objectives</button>
              <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">Throughput</button>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
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
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '1.5rem', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                    padding: '1.5rem',
                    color: '#fff'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '8px', fontSize: '10px', fontWeight: 'black', textTransform: 'uppercase' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={5}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Activity & Stats */}
        <div className="lg:col-span-4 space-y-8 flex flex-col">
          {/* Target Progress */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group"
          >
            <Target className="absolute -top-6 -right-6 w-40 h-40 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
            <h4 className="text-xl font-display font-bold mb-1 relative z-10 italic">Strategic Target</h4>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-10 relative z-10">Monthly Success Index</p>
            
            <div className="relative z-10 mb-8">
               <div className="flex justify-between items-end mb-3">
                 <span className="text-4xl font-display font-black">84%</span>
                 <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Optimized</span>
               </div>
               <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '84%' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 rounded-full"
                />
              </div>
            </div>
            
            <div className="flex justify-between text-[10px] font-black text-slate-500 relative z-10 uppercase tracking-[0.2em]">
              <span>Objective: 100 Missions</span>
              <span className="text-white">16 Remaining</span>
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-10 rounded-[3.5rem] border border-slate-200/60 shadow-sm flex-1 flex flex-col"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-display font-black text-slate-900 tracking-tight">Live Pulse</h3>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 text-brand-600 rounded-xl text-[9px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"></span>
                Event Log
              </div>
            </div>
            <div className="space-y-8 flex-1">
              {activities.slice(0, 3).map((activity, idx) => {
                const actor = team.find(u => u.id === activity.userId);
                return (
                  <div key={idx} className="flex gap-5 group">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-slate-50 group-hover:rotate-12 transition-transform shadow-sm">
                        <img 
                          src={actor?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.userId}`} 
                          className="w-full h-full object-cover" 
                          alt="User"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-lg flex items-center justify-center border border-slate-100 shadow-sm">
                        <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 leading-tight mb-1 truncate">
                        {actor?.name || 'Operative'}
                      </p>
                      <p className="text-xs font-semibold text-slate-400 capitalize">{activity.action}</p>
                      <p className="text-[10px] font-black text-slate-300 mt-2 uppercase tracking-tighter">
                        {format(new Date(activity.createdAt), 'HH:mm')} Zulu
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="w-full mt-10 py-5 bg-slate-50 hover:bg-slate-100 text-[10px] font-black text-slate-500 hover:text-slate-900 rounded-2xl transition-all uppercase tracking-widest active:scale-95">
              Full Archive Intelligence
            </button>
          </motion.div>
        </div>
      </div>

      {/* Projects Overview Row */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <div className="lg:col-span-8 bg-white rounded-[3.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="p-10 flex items-center justify-between border-b border-slate-50">
            <div>
              <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">Deployment Health</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time status of top initiatives</p>
            </div>
            <button className="w-12 h-12 bg-brand-50 hover:bg-brand-600 hover:text-white rounded-2xl transition-all flex items-center justify-center text-brand-600 shadow-sm active:scale-90">
              <Plus className="w-6 h-6" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Objective</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Squad</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Phase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/60">
                {projects.slice(0, 4).map((project, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 font-bold group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors shadow-inner">
                          <Layers className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">{project.name}</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Asset Active</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-left">
                      <div className="w-full max-w-[120px]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black text-slate-400">{project.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-brand-600 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map((_, i) => (
                          <div key={i} className="w-9 h-9 rounded-xl bg-slate-200 border-4 border-white flex items-center justify-center overflow-hidden shadow-sm group-hover:translate-y-1 transition-transform">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i + idx}`} alt="user" />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                        project.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        'bg-slate-50 text-slate-400 border-slate-200'
                      }`}>
                        {project.status === 'ACTIVE' ? 'Operational' : 'Standby'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Small Analytics Widget */}
        <div className="lg:col-span-4 bg-white p-10 rounded-[3.5rem] border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center group">
          <div className="w-32 h-32 rounded-full border-[10px] border-slate-50 flex items-center justify-center mb-8 relative">
             <svg className="w-full h-full absolute -rotate-90">
                <circle 
                  cx="60" cy="60" r="50" 
                  fill="none" stroke="currentColor" 
                  strokeWidth="10" 
                  className="text-brand-500"
                  strokeDasharray="314"
                  strokeDashoffset="80"
                  style={{ transform: 'translate(4px, 4px)' }}
                />
             </svg>
             <span className="text-3xl font-display font-black text-slate-900 group-hover:scale-110 transition-transform">72%</span>
          </div>
          <h4 className="text-2xl font-display font-black text-slate-900 mb-2">Squad Density</h4>
          <p className="text-sm font-medium text-slate-400 mb-8 px-4 leading-relaxed group-hover:text-slate-600 transition-colors">Your team is currently operating at 72% calculated efficiency capacity. Room for 4 more assignments.</p>
          <div className="flex gap-4 w-full">
            <div className="flex-1 bg-slate-50 p-4 rounded-3xl border border-slate-100 hover:bg-brand-50 transition-colors">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Backlog</p>
              <p className="text-xl font-display font-black text-slate-900">128</p>
            </div>
            <div className="flex-1 bg-slate-50 p-4 rounded-3xl border border-slate-100 hover:bg-red-50 transition-colors">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Risks</p>
              <p className="text-xl font-display font-black text-red-600">04</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
