import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  ArrowRight, 
  Zap, 
  Shield, 
  BarChart, 
  Smartphone,
  CheckCircle2,
  Users,
  Layout,
  Command,
  Star,
  Globe,
  Lock,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Avatar } from '../components/Avatar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0F] font-sans text-slate-400 overflow-x-hidden">
      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-black/40 backdrop-blur-xl border border-white/[0.05] shadow-2xl rounded-xl px-6 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <Command className="text-white w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white leading-none">Task Manager</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              <a href="#features" className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Platform</a>
              <a href="#solutions" className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Solutions</a>
              <a href="#pricing" className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Resources</a>
            </div>

            <div className="flex items-center gap-4 text-white">
              <Link to="/login" className="hidden sm:block text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Log in</Link>
              <Link 
                to="/signup" 
                className="bg-brand-600 text-white h-9 px-6 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-brand-500 transition-all shadow-lg active:scale-95 flex items-center justify-center"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
          <div className="absolute top-20 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05),transparent_70%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 bg-brand-500/5 border border-brand-500/20 rounded-full">
              <Star className="w-3 h-3 text-brand-500 fill-brand-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-400 leading-none">The #1 Platform for Technical Teams</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-white mb-8 max-w-5xl mx-auto leading-[0.9] text-balance">
              Orchestrate <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400 italic">Greatness.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-bold uppercase tracking-tight">
              Task Manager merges mission-critical task management with high-fidelity analytics to turn chaos into absolute clarity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/signup" 
                className="w-full sm:w-auto bg-white text-black h-13 px-12 rounded-xl font-bold text-[11px] flex items-center justify-center gap-3 hover:bg-brand-500 hover:text-white transition-all shadow-2xl active:scale-95 group uppercase tracking-[0.2em]"
              >
                Sign Up Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto bg-white/5 text-slate-300 border border-white/10 h-13 px-12 rounded-xl font-bold text-[11px] hover:bg-white/10 transition-all active:scale-95 uppercase tracking-[0.2em]">
                Live Preview
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-5">
              <div className="flex -space-x-3">
                {['Alex', 'Ben', 'Chloe', 'David'].map(name => (
                  <Avatar key={name} name={name} size="sm" className="border-2 border-[#0B0B0F] shadow-2xl" />
                ))}
              </div>
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em]">Trusted by 10k+ Technical Leads</p>
            </div>
          </motion.div>

          {/* Premium Product Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-24 relative mx-auto max-w-6xl"
          >
            <div className="relative rounded-2xl p-1 bg-gradient-to-br from-white/10 to-transparent shadow-[0_0_100px_rgba(99,102,241,0.1)] overflow-hidden group">
              <div className="rounded-xl overflow-hidden border border-white/5 bg-slate-900/50 backdrop-blur-3xl">
                 <img 
                  src="https://images.unsplash.com/photo-1551288049-bbda48338787?auto=format&fit=crop&q=80&w=2426" 
                  alt="Task Manager Dashboard" 
                  className="w-full opacity-60 mix-blend-overlay group-hover:scale-[1.01] transition-transform duration-1000 grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section id="features" className="py-32 bg-[#0B0B0F] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.03),transparent_70%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tighter">The Tactical Protocol.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-bold uppercase tracking-widest text-[11px]">
              Engineered for high-velocity teams who demand total precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white/[0.02] border border-white/[0.04] p-12 rounded-3xl relative overflow-hidden group shadow-2xl backdrop-blur-md">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-brand-600/10 text-brand-400 rounded-2xl flex items-center justify-center mb-8 border border-brand-500/10">
                    <Zap className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Project Neural Canvas</h3>
                  <p className="text-lg text-slate-500 max-w-lg mb-10 leading-relaxed font-medium">
                    Task Manager rearranged the way we think about work flow. It's not just a board; it's a team neural assistant for complex projects.
                  </p>
                </div>
                <div className="flex flex-wrap gap-6">
                  {['Intelligent Sorting', 'Real-time Sync', 'Adaptive Workflows'].map(f => (
                    <div key={f} className="flex items-center gap-3 text-slate-400 group/item">
                      <CheckCircle2 className="w-5 h-5 text-brand-500" />
                      <span className="font-bold text-[10px] tracking-[0.2em] uppercase group-hover/item:text-white transition-colors">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-600/5 rounded-full blur-[100px] pointer-events-none transition-all group-hover:bg-brand-600/10"></div>
            </div>

            <div className="bg-gradient-to-br from-brand-600 to-[#4F46E5] p-12 rounded-3xl text-white flex flex-col justify-between shadow-[0_20px_50px_rgba(99,102,241,0.2)] group transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                <BarChart className="w-7 h-7" />
              </div>
              <div>
                 <h3 className="text-3xl font-bold mb-4 tracking-tight">Deep Tactical Analytics</h3>
                 <div className="h-2 bg-black/20 rounded-full overflow-hidden mb-6 border border-white/10">
                   <div className="w-3/4 h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                 </div>
                 <p className="text-5xl font-display font-bold mb-2 tracking-tighter">98.2%</p>
                 <p className="text-[10px] text-white/60 uppercase font-black tracking-[0.3em]">Efficiency Threshold</p>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.04] p-10 rounded-3xl flex flex-col items-center text-center group transition-all hover:bg-white/[0.04] backdrop-blur-md">
              <div className="w-14 h-14 bg-violet-600/10 text-violet-400 rounded-2xl flex items-center justify-center mb-8 border border-violet-500/10">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase tracking-widest text-sm">Vault Privacy</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                End-to-end tactical encryption and ultra-granular role-based access controls.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.04] p-10 rounded-3xl flex flex-col items-center text-center group transition-all hover:bg-white/[0.04] backdrop-blur-md">
              <div className="w-14 h-14 bg-emerald-600/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/10">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase tracking-widest text-sm">Global Sync</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Distributed coordination protocols across every hemisphere and timezone.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.04] p-10 rounded-3xl flex flex-col items-center text-center group transition-all hover:bg-white/[0.04] backdrop-blur-md">
              <div className="w-14 h-14 bg-amber-600/10 text-amber-400 rounded-2xl flex items-center justify-center mb-8 border border-amber-500/10">
                <Layout className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase tracking-widest text-sm">Fluid Mobile</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                The full tactical power of Task Manager optimized for handheld devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-[#0B0B0F]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[3rem] p-16 md:p-32 text-center relative overflow-hidden backdrop-blur-3xl shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-10 tracking-tighter leading-none italic">Join the Elite.</h2>
              <p className="text-slate-500 text-xl mb-12 max-w-xl mx-auto font-bold uppercase tracking-[0.2em] text-[12px]">
                Task Manager is not just another utility, it is a master deployment strategy.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  to="/signup" 
                  className="w-full sm:w-auto bg-white text-black h-16 px-16 rounded-2xl font-bold text-base hover:bg-brand-500 hover:text-white transition-all shadow-3xl active:scale-95 flex items-center justify-center uppercase tracking-[0.3em]"
                >
                  Enter Protocol
                </Link>
                <div className="flex items-center gap-3 px-8 h-16 border border-white/5 rounded-2xl bg-white/[0.01]">
                   <p className="text-slate-600 font-bold uppercase tracking-[0.4em] text-[10px]">Trial Active</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[150px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 border-t border-white/[0.03] bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-24">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                  <Command className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-white leading-none">Task Manager</span>
              </div>
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-[200px]">
                High-fidelity engineering for team coordination.
              </p>
            </div>
            
            <div>
              <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-10">Protocol</h4>
              <ul className="space-y-5 text-[10px] font-bold text-slate-600">
                <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Efficiency</a></li>
                <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Automation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-10">Nexus</h4>
              <ul className="space-y-5 text-[10px] font-bold text-slate-600">
                <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Intelligence</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-10">Compliance</h4>
              <ul className="space-y-5 text-[10px] font-bold text-slate-600">
                <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Encryption</a></li>
                <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Integrity</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-10">Connect</h4>
              <ul className="space-y-5 text-[10px] font-bold text-slate-600">
                <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Terminal</a></li>
                <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Network</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[9px] font-bold text-slate-700 uppercase tracking-[0.5em]">© 2026 Task Manager Labs. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-3 text-[9px] font-bold text-slate-700 uppercase tracking-[0.3em]">
              <span>CORE STATUS:</span>
              <span className="flex items-center gap-2 text-brand-500">
                 <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                 FULLY OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
