import React, { useMemo } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  TrendingUp,
  Activity,
  Layers,
  Search,
  Filter,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

// Types
type Status = 'Completed' | 'Overdue' | 'In Progress' | 'Pending';

interface DemoTask {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  status: Status;
}

// Dummy Data Generator
const generateDemoTasks = (): DemoTask[] => {
  const categories = ['UI/UX Design', 'Research', 'Development', 'Planning', 'Testing', 'Management'];
  const statuses: Status[] = ['Completed', 'Overdue', 'In Progress', 'Pending'];
  const titles = [
    'Homepage Redesign',
    'Sprint Planning',
    'API Integration',
    'Mobile UI Wireframe',
    'Research Analysis',
    'Dashboard Optimization',
    'User Testing',
    'Landing Page Update',
    'Performance Audit',
    'Product Review',
    'Auth Middleware Refactor',
    'System Design Audit',
    'Feedback Loop Setup',
    'CI/CD Pipeline Fix',
    'Security Patch Review',
    'Asset Library Audit',
    'Infrastructure Scaling',
    'Regression Suite QA',
    'Onboarding Redesign',
    'Legacy Code Cleanup'
  ];

  return titles.map((title, index) => ({
    id: `TM-${4000 + Math.floor(Math.random() * 5000)}`,
    title,
    category: categories[index % categories.length],
    dueDate: index % 5 === 0 ? 'Exp. Yesterday' : index % 3 === 0 ? 'In 3 days' : 'Today',
    status: statuses[index % statuses.length]
  }));
};

const MiniActivityGraph = ({ color }: { color: string }) => {
  const data = useMemo(() => Array.from({ length: 15 }, () => ({ val: Math.floor(Math.random() * 25) + 5 })), []);
  return (
    <div className="h-6 w-20 opacity-40 overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area type="monotone" dataKey="val" stroke={color} fill={color} fillOpacity={0.2} strokeWidth={1.5} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const StatusBadge = ({ status }: { status: Status }) => {
  const styles = {
    'Completed': 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20',
    'Overdue': 'bg-rose-500/5 text-rose-500 border-rose-500/20',
    'In Progress': 'bg-blue-500/5 text-blue-500 border-blue-500/20',
    'Pending': 'bg-orange-500/5 text-orange-500 border-orange-500/20'
  };

  return (
    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${styles[status]} whitespace-nowrap`}>
      {status}
    </span>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  const demoTasks = useMemo(() => generateDemoTasks(), []);
  
  const stats = [
    { 
      label: 'Overall Productivity', 
      value: '94.2%', 
      trend: '+2.4%', 
      sub: 'vs average', 
      color: '#6366f1', 
      icon: Activity,
      chart: true 
    },
    { 
      label: 'On-Time Completion', 
      value: '88.5%', 
      trend: '+4.1%', 
      sub: 'current sprint', 
      color: '#10b981', 
      icon: CheckCircle2,
      chart: true 
    },
    { 
      label: 'Active Objectives', 
      value: '142', 
      trend: '-1.2%', 
      sub: 'pending review', 
      color: '#f59e0b', 
      icon: Layers,
      chart: true 
    },
  ];

  const distribution = [
    { name: 'Direct Execution', value: 72, growth: '+12%', color: '#6366f1' },
    { name: 'Strategic Planning', value: 64, growth: '+5%', color: '#10b981' },
    { name: 'System Maintenance', value: 48, growth: '-2%', color: '#f59e0b' },
    { name: 'Team Alignment', value: 32, growth: '+8%', color: '#8b5cf6' },
    { name: 'Research & R&D', value: 24, growth: '+15%', color: '#ec4899' },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans overflow-x-hidden text-slate-400">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-display font-bold text-white tracking-tight">Intelligence Dashboard</h1>
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">Real-time tactical throughput: <span className="text-brand-400">Active</span></p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 bg-white/[0.03] hover:bg-white/10 border border-white/5 rounded-md text-slate-400 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2">
            <Filter className="w-3 h-3" />
            Filters
          </button>
          <button className="h-8 w-8 bg-white/[0.03] hover:bg-white/10 border border-white/5 rounded-md text-slate-400 flex items-center justify-center transition-all">
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Stats Section - 3 Columns */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className="group relative bg-dark-card/40 backdrop-blur-xl p-5 rounded-xl border border-white/[0.03] hover:border-white/[0.08] transition-all duration-300 shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-start mb-5">
               <div>
                 <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.15em] mb-2">{stat.label}</p>
                 <h3 className="text-3xl font-display font-bold text-white tracking-tighter leading-none">{stat.value}</h3>
               </div>
               <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.02] text-[9px] font-bold border border-white/[0.03] ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                 <ArrowUpRight className={`w-2.5 h-2.5 ${stat.trend.startsWith('+') ? '' : 'rotate-90'}`} />
                 {stat.trend}
               </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-slate-700 uppercase tracking-widest leading-none">Status</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.sub}</span>
              </div>
              <MiniActivityGraph color={stat.color} />
            </div>

            <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[${stat.color}]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Task Table Section (8/12) */}
        <div className="lg:col-span-8 bg-dark-card/20 rounded-xl border border-white/[0.04] overflow-hidden flex flex-col shadow-2xl backdrop-blur-lg">
           <div className="px-6 py-5 border-b border-white/[0.03] flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                 <h4 className="text-xs font-bold text-white tracking-widest uppercase">Tactical Operations Registry</h4>
              </div>
              <div className="flex items-center gap-2">
                 <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-700" />
                    <input 
                      type="text" 
                      placeholder="Search log..." 
                      className="bg-white/[0.02] border border-white/[0.05] pl-8 pr-3 py-1.5 rounded-lg text-[10px] font-bold text-white placeholder:text-slate-700 focus:outline-none w-32 md:w-56 transition-all focus:bg-white/[0.04] focus:border-white/[0.1]"
                    />
                 </div>
              </div>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-white/[0.015] border-b border-white/[0.03]">
                   <th className="px-6 py-3 w-10">
                     <div className="w-3.5 h-3.5 border border-white/10 rounded-sm cursor-pointer hover:border-brand-500/50 transition-colors" />
                   </th>
                   <th className="px-6 py-3 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">Asset ID</th>
                   <th className="px-6 py-3 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">Objective</th>
                   <th className="px-6 py-3 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">Classification</th>
                   <th className="px-6 py-3 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">Deadline</th>
                   <th className="px-6 py-3 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] text-right">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.03]">
                 {demoTasks.slice(0, 10).map((task) => (
                   <tr key={task.id} className="group hover:bg-white/[0.02] transition-all cursor-pointer">
                     <td className="px-6 py-4">
                       <div className="w-3.5 h-3.5 border border-white/10 rounded-sm group-hover:border-brand-500 transition-colors" />
                     </td>
                     <td className="px-6 py-4 text-[9px] font-bold text-slate-600 font-mono tracking-tighter uppercase">{task.id}</td>
                     <td className="px-6 py-4">
                        <div className="flex flex-col">
                           <span className="text-xs font-bold text-slate-200 tracking-tight group-hover:text-white transition-colors">{task.title}</span>
                           <span className="text-[8px] font-bold text-slate-700 uppercase tracking-widest mt-0.5">Priority Omega</span>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                       <span className="text-[8px] font-black text-brand-400 bg-brand-400/5 px-2 py-0.5 rounded-md border border-brand-400/10 uppercase tracking-widest">
                         {task.category}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-[9px] font-bold text-slate-500">{task.dueDate}</td>
                     <td className="px-6 py-4 text-right">
                       <StatusBadge status={task.status} />
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           
           <div className="p-4 border-t border-white/[0.03] text-center bg-white/[0.005]">
             <button className="text-[10px] font-bold text-slate-600 hover:text-white uppercase tracking-[0.25em] transition-all flex items-center gap-2 mx-auto group">
               <span>Access Full Archive</span>
               <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
             </button>
           </div>
        </div>

        {/* Distribution Panel Section (4/12) */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-card/30 p-8 rounded-xl border border-white/[0.03] shadow-2xl relative overflow-hidden h-full flex flex-col backdrop-blur-xl"
          >
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-1.5">Capacity Allocation</h4>
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Resource Distribution Index</p>
              </div>
              <div className="p-2 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                 <Activity className="w-4 h-4 text-brand-400" />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-10">
               <div className="text-center group cursor-default">
                  <div className="relative inline-block">
                    <span className="text-5xl font-display font-bold text-white tracking-tighter leading-none">74.8%</span>
                    <div className="absolute -top-1 -right-4 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75" />
                  </div>
                  <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.25em] mt-3 flex items-center justify-center gap-1.5">
                    <TrendingUp className="w-3 h-3" />
                    Velocity Threshold
                  </p>
               </div>

               <div className="space-y-7">
                  {distribution.map(item => (
                    <div key={item.name} className="space-y-3 group/item">
                       <div className="flex justify-between items-end text-[9px] font-bold uppercase tracking-widest leading-none">
                          <span className="text-slate-500 group-hover/item:text-white transition-colors">{item.name}</span>
                          <div className="flex items-center gap-2">
                             <span className="text-slate-700 text-[8px] font-black">{item.growth}</span>
                             <span className="text-white text-[10px]">{item.value}%</span>
                          </div>
                       </div>
                       <div className="h-[3px] bg-white/[0.03] rounded-full overflow-hidden flex">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full shadow-[0_0_10px_transparent] group-hover/item:shadow-current transition-all"
                            style={{ backgroundColor: item.color }}
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/[0.03]">
               <button className="w-full h-11 bg-white/[0.03] hover:bg-brand-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] border border-white/[0.06] transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-xl">
                 <Layers className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                 Optimize Workspace
               </button>
            </div>
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
