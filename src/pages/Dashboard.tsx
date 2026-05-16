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
    <div className="space-y-8 pb-12 font-sans overflow-x-hidden text-slate-400">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-black text-white tracking-tighter italic uppercase">Operations Matrix</h1>
          <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Real-time tactical throughput: <span className="text-brand-500 animate-pulse">Synchronized</span></p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-xl text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 group">
            <Filter className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
            Segment Matrix
          </button>
          <button className="h-10 w-10 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-xl text-slate-700 flex items-center justify-center transition-all">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Section - 3 Columns */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className="group relative bg-white/[0.01] backdrop-blur-3xl p-8 rounded-[2rem] border border-white/[0.03] hover:border-white/[0.1] transition-all duration-500 shadow-3xl overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
               <div>
                 <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] mb-4 italic">{stat.label}</p>
                 <h3 className="text-5xl font-display font-black text-white tracking-tighter leading-none italic">{stat.value}</h3>
               </div>
               <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black text-[10px] font-black border border-white/[0.05] shadow-2xl ${stat.trend.startsWith('+') ? 'text-brand-400' : 'text-rose-500'}`}>
                 <ArrowUpRight className={`w-3 h-3 ${stat.trend.startsWith('+') ? '' : 'rotate-90'}`} />
                 {stat.trend}
               </div>
            </div>
            
            <div className="flex items-end justify-between mt-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-black text-slate-800 uppercase tracking-[0.4em] leading-none">Node Status</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.sub}</span>
              </div>
              <MiniActivityGraph color={stat.color} />
            </div>

            <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_20px_rgba(99,102,241,0.5)]`} />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Task Table Section (8/12) */}
        <div className="lg:col-span-8 bg-white/[0.01] rounded-[2.5rem] border border-white/[0.03] overflow-hidden flex flex-col shadow-3xl backdrop-blur-3xl">
           <div className="px-8 py-7 border-b border-white/[0.03] flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(99,102,241,1)]" />
                 <h4 className="text-[11px] font-black text-white tracking-[0.4em] uppercase italic">Tactical Registry</h4>
              </div>
              <div className="flex items-center gap-3">
                 <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-800 group-focus-within:text-brand-500 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="SEARCH LOG..." 
                      className="bg-black/40 border border-white/5 pl-10 pr-4 py-2.5 rounded-xl text-[10px] font-black text-white placeholder:text-slate-800 focus:outline-none w-32 md:w-64 transition-all focus:bg-black focus:border-brand-500/50 tracking-widest"
                    />
                 </div>
              </div>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-white/[0.005] border-b border-white/[0.03]">
                   <th className="px-8 py-5 w-14">
                     <div className="w-4 h-4 border border-white/5 rounded-md cursor-pointer hover:border-brand-500 transition-all bg-black/20" />
                   </th>
                   <th className="px-8 py-5 text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">Node ID</th>
                   <th className="px-8 py-5 text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">Objective</th>
                   <th className="px-8 py-5 text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">Protocol</th>
                   <th className="px-8 py-5 text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">ETA</th>
                   <th className="px-8 py-5 text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] text-right">State</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.02]">
                 {demoTasks.slice(0, 10).map((task) => (
                   <tr key={task.id} className="group hover:bg-white/[0.015] transition-all cursor-pointer">
                     <td className="px-8 py-6">
                       <div className="w-4 h-4 border border-white/5 rounded-md group-hover:border-brand-500 transition-all shadow-inner" />
                     </td>
                     <td className="px-8 py-6 text-[10px] font-black text-slate-700 font-mono tracking-tighter uppercase">{task.id}</td>
                     <td className="px-8 py-6">
                        <div className="flex flex-col">
                           <span className="text-sm font-black text-slate-200 tracking-tight group-hover:text-white transition-colors uppercase italic">{task.title}</span>
                           <span className="text-[9px] font-black text-slate-800 uppercase tracking-[0.3em] mt-1">Priority Level: Omega</span>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                       <span className="text-[9px] font-black text-brand-500 bg-brand-500/5 px-3 py-1 rounded-lg border border-brand-500/10 uppercase tracking-[0.2em] shadow-2xl">
                         {task.category}
                       </span>
                     </td>
                     <td className="px-8 py-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">{task.dueDate}</td>
                     <td className="px-8 py-6 text-right">
                       <StatusBadge status={task.status} />
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           
           <div className="p-6 border-t border-white/[0.03] text-center bg-white/[0.01]">
             <button className="text-[11px] font-black text-slate-800 hover:text-white uppercase tracking-[0.4em] transition-all flex items-center gap-3 mx-auto group">
               <span>Access Master Archive</span>
               <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
             </button>
           </div>
        </div>

        {/* Distribution Panel Section (4/12) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.01] p-10 rounded-[2.5rem] border border-white/[0.03] shadow-3xl relative overflow-hidden h-full flex flex-col backdrop-blur-3xl group"
          >
            <div className="mb-10 flex justify-between items-start">
              <div>
                <h4 className="text-[11px] font-black text-white tracking-[0.4em] uppercase mb-2 italic">Unit Flux</h4>
                <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">Resource Distribution Index</p>
              </div>
              <div className="p-3 bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl">
                 <Activity className="w-5 h-5 text-brand-500" />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-12">
               <div className="text-center group cursor-default">
                  <div className="relative inline-block">
                    <span className="text-7xl font-display font-black text-white tracking-tighter leading-none italic">74.8%</span>
                    <div className="absolute -top-2 -right-6 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75" />
                  </div>
                  <p className="text-[12px] font-black text-emerald-500 uppercase tracking-[0.4em] mt-5 flex items-center justify-center gap-2 italic">
                    <TrendingUp className="w-4 h-4" />
                    Flux Capacity
                  </p>
               </div>

               <div className="space-y-8">
                  {distribution.map(item => (
                    <div key={item.name} className="space-y-4 group/item">
                       <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-[0.3em] leading-none">
                          <span className="text-slate-800 group-hover/item:text-brand-400 transition-all">{item.name}</span>
                          <div className="flex items-center gap-3">
                             <span className="text-[#1e1b4b] text-[9px] font-black">{item.growth}</span>
                             <span className="text-white text-[11px] font-mono tracking-tighter">{item.value}%</span>
                          </div>
                       </div>
                       <div className="h-[4px] bg-white/[0.02] rounded-full overflow-hidden flex shadow-inner">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover/item:shadow-current transition-all"
                            style={{ backgroundColor: item.color }}
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="mt-14 pt-10 border-t border-white/[0.03]">
               <button className="w-full h-14 bg-white/[0.02] hover:bg-brand-600 text-white rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.4em] border border-white/[0.06] transition-all flex items-center justify-center gap-4 group active:scale-95 shadow-3xl">
                 <Layers className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                 Sync Environment
               </button>
            </div>
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
