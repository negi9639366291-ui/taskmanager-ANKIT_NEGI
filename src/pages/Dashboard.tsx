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
  const categories = ['UI/UX Design', 'Research', 'Development', 'Planning', 'Testing', 'DevOps'];
  const statuses: Status[] = ['Completed', 'Overdue', 'In Progress', 'Pending'];
  const titles = [
    'Refactor auth middleware',
    'Design system audit',
    'Customer feedback loop',
    'Setup CI/CD pipeline',
    'API Documentation v2',
    'User interview analysis',
    'Landing page optimization',
    'Database migration',
    'Security patch audit',
    'Mobile app wireframes',
    'Sprint planning survey',
    'Performance profiling',
    'Analytics integration',
    'Asset library update',
    'Cloud infrastructure scaling',
    'Unit test coverage improvement',
    'QA regression suite',
    'Onboarding flow redesign',
    'Legacy code cleanup',
    'Multi-tenant support'
  ];

  return titles.map((title, index) => ({
    id: `TM-${1000 + index}`,
    title,
    category: categories[index % categories.length],
    dueDate: index % 4 === 0 ? 'Yesterday' : index % 3 === 0 ? 'In 2 days' : 'Today',
    status: statuses[index % statuses.length]
  }));
};

const MiniActivityGraph = ({ color }: { color: string }) => {
  const data = useMemo(() => Array.from({ length: 12 }, () => ({ val: Math.floor(Math.random() * 20) + 5 })), []);
  return (
    <div className="h-8 w-16 opacity-50 overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <Bar dataKey="val" radius={[2, 2, 0, 0]} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const StatusBadge = ({ status }: { status: Status }) => {
  const styles = {
    'Completed': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Overdue': 'bg-red-500/10 text-red-500 border-red-500/20',
    'In Progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'Pending': 'bg-orange-500/10 text-orange-500 border-orange-500/20'
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  const demoTasks = useMemo(() => generateDemoTasks(), []);
  
  const stats = [
    { label: 'Productivity', value: '94.2%', trend: '+2.4%', color: '#6366f1', icon: Activity },
    { label: 'On-Time Completion', value: '88.5%', trend: '+4.1%', color: '#10b981', icon: CheckCircle2 },
    { label: 'Tasks Completed', value: '428', trend: '+12%', color: '#f59e0b', icon: Layers },
    { label: 'Focus Hours', value: '32.5h', trend: '-1.2%', color: '#8b5cf6', icon: Clock },
  ];

  const distributionData = [
    { name: 'Research', value: 35, color: '#6366f1' },
    { name: 'Design', value: 25, color: '#f59e0b' },
    { name: 'Dev', value: 30, color: '#10b981' },
    { name: 'Ops', value: 10, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-8 pb-12 font-sans overflow-x-hidden">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Overview</h1>
          <p className="text-slate-500 text-sm font-medium">Monitoring tactical throughput for <span className="text-brand-400">Task Manager Labs</span>.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-slate-300 text-xs font-bold transition-all flex items-center gap-2">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
          <button className="h-9 w-9 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-slate-300 flex items-center justify-center transition-all">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Section */}
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
            className="group relative bg-dark-card p-5 rounded-2xl border border-white/[0.03] hover:border-white/[0.08] transition-all duration-300 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-4">
               <div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                 <h3 className="text-2xl font-display font-bold text-white tracking-tight">{stat.value}</h3>
               </div>
               <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                 <ArrowUpRight className={`w-3 h-3 ${stat.trend.startsWith('+') ? '' : 'rotate-90'}`} />
                 {stat.trend}
               </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div className="p-2 bg-white/[0.03] rounded-lg text-slate-400">
                <stat.icon className="w-4 h-4" />
              </div>
              <MiniActivityGraph color={stat.color} />
            </div>

            {/* Subtle Gradient Glow */}
            <div className={`absolute inset-0 bg-gradient-to-tr from-transparent to-[${stat.color}]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl`} />
          </motion.div>
        ))}
      </motion.div>

      {/* Middle Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Productivity Main Graph */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 bg-dark-card rounded-2xl border border-white/[0.03] overflow-hidden"
        >
          <div className="px-6 py-5 flex items-center justify-between border-b border-white/[0.03]">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400">
                 <TrendingUp className="w-4 h-4" />
               </div>
               <div>
                  <h4 className="text-sm font-bold text-white leading-none">Throughput Analysis</h4>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">System-wide velocity</p>
               </div>
             </div>
             <div className="flex gap-1">
                {['1W', '1M', '3M'].map(t => (
                  <button key={t} className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${t === '1W' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                    {t}
                  </button>
                ))}
             </div>
          </div>
          <div className="p-6 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { name: 'Mon', val: 400 },
                { name: 'Tue', val: 300 },
                { name: 'Wed', val: 600 },
                { name: 'Thu', val: 450 },
                { name: 'Fri', val: 700 },
                { name: 'Sat', val: 500 },
                { name: 'Sun', val: 650 },
              ]}>
                <defs>
                  <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={3} fill="url(#glow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Focus Goals */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="lg:col-span-4 bg-dark-card rounded-2xl border border-white/[0.03] p-6 flex flex-col justify-between"
        >
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Focus Target</h4>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Sprint alignment</p>
            
            <div className="space-y-4">
               {[
                 { label: 'Cloud Expansion', val: 75, color: '#6366f1' },
                 { label: 'Security Protocols', val: 40, color: '#f59e0b' },
                 { label: 'UX Synergy', val: 90, color: '#10b981' },
               ].map(goal => (
                 <div key={goal.label} className="space-y-2">
                   <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                     <span className="text-slate-400">{goal.label}</span>
                     <span className="text-white">{goal.val}%</span>
                   </div>
                   <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }} 
                       animate={{ width: `${goal.val}%` }}
                       className="h-full rounded-full" 
                       style={{ backgroundColor: goal.color }}
                     />
                   </div>
                 </div>
               ))}
            </div>
          </div>
          
          <button className="w-full mt-8 py-2.5 bg-white/5 hover:bg-white/10 text-xs font-bold text-white rounded-xl border border-white/5 transition-all uppercase tracking-widest">
            Adjust Benchmarks
          </button>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Task Table Section */}
        <div className="lg:col-span-8 bg-dark-card rounded-2xl border border-white/[0.03] overflow-hidden flex flex-col shadow-2xl">
           <div className="px-6 py-5 border-b border-white/[0.03] flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Tacit Objectives</h4>
              <div className="flex items-center gap-2">
                 <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600" />
                    <input 
                      type="text" 
                      placeholder="Search tasks..." 
                      className="bg-white/[0.03] border border-white/[0.05] pl-8 pr-3 py-1.5 rounded-lg text-[10px] font-bold text-white placeholder:text-slate-600 focus:outline-none w-32 md:w-48"
                    />
                 </div>
                 <button className="p-1.5 bg-white/[0.03] hover:bg-white/[0.08] rounded-lg text-slate-500 transition-all border border-white/[0.05]">
                    <ChevronDown className="w-3 h-3" />
                 </button>
              </div>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-white/[0.01]">
                   <th className="px-6 py-3 w-10">
                     <div className="w-4 h-4 border border-white/20 rounded cursor-pointer" />
                   </th>
                   <th className="px-6 py-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">ID</th>
                   <th className="px-6 py-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Objective</th>
                   <th className="px-6 py-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Context</th>
                   <th className="px-6 py-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Due Date</th>
                   <th className="px-6 py-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest text-right">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.03]">
                 {demoTasks.map((task) => (
                   <tr key={task.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                     <td className="px-6 py-3.5">
                       <div className="w-4 h-4 border border-white/20 rounded group-hover:border-brand-500 transition-colors" />
                     </td>
                     <td className="px-6 py-3.5 text-[10px] font-bold text-slate-500">{task.id}</td>
                     <td className="px-6 py-3.5 text-xs font-bold text-white tracking-tight">{task.title}</td>
                     <td className="px-6 py-3.5">
                       <span className="text-[10px] font-bold text-brand-400 bg-brand-400/5 px-2 py-0.5 rounded border border-brand-400/10">
                         {task.category}
                       </span>
                     </td>
                     <td className="px-6 py-3.5 text-[10px] font-bold text-slate-500">{task.dueDate}</td>
                     <td className="px-6 py-3.5 text-right">
                       <StatusBadge status={task.status} />
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           
           <div className="p-4 border-t border-white/[0.03] text-center">
             <button className="text-[10px] font-bold text-brand-400 uppercase tracking-widest hover:text-brand-300 transition-colors">
               View Full Registry
             </button>
           </div>
        </div>

        {/* Task Distribution Panel */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-card rounded-2xl border border-white/[0.03] p-6 shadow-2xl relative overflow-hidden"
          >
            <h4 className="text-sm font-bold text-white mb-1">Work Distribution</h4>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">Capacity allocation</p>
            
            <div className="h-[180px] w-full relative mb-8">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                 </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold text-white leading-none">2.4k</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 text-center leading-none">Total Units</span>
               </div>
            </div>

            <div className="space-y-4">
               {distributionData.map(item => (
                 <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                       <span className="text-[11px] font-bold text-white">{item.name}</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">{item.value}%</span>
                 </div>
               ))}
            </div>
            
            {/* Background Mesh Glow */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand-500/10 rounded-full blur-[60px]" />
          </motion.div>

          <div className="bg-gradient-to-br from-brand-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-brand-500/10">
             <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Activity className="w-5 h-5 text-white" />
             </div>
             <h4 className="text-base font-bold mb-2">Upgrade to Pro</h4>
             <p className="text-xs text-brand-100 font-medium mb-6 leading-relaxed opacity-80">Unlock advanced tactical insights and multi-org synchronization.</p>
             <button className="w-full py-2.5 bg-white text-brand-600 text-xs font-bold rounded-xl transition-all hover:bg-brand-50 active:scale-95 uppercase tracking-widest shadow-lg shadow-black/10">
                Go Premium
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
