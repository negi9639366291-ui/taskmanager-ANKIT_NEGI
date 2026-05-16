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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfd] font-sans text-slate-900 overflow-x-hidden">
      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl shadow-slate-200/20 rounded-xl px-6 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/10">
                <Command className="text-white w-4.5 h-4.5" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-slate-900 leading-none">SyncPro</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              <a href="#features" className="text-[10px] font-bold text-slate-500 hover:text-brand-600 transition-colors uppercase tracking-widest">Platform</a>
              <a href="#solutions" className="text-[10px] font-bold text-slate-500 hover:text-brand-600 transition-colors uppercase tracking-widest">Solutions</a>
              <a href="#pricing" className="text-[10px] font-bold text-slate-500 hover:text-brand-600 transition-colors uppercase tracking-widest">Resources</a>
            </div>

            <div className="flex items-center gap-4 text-slate-900">
              <Link to="/login" className="hidden sm:block text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Log in</Link>
              <Link 
                to="/signup" 
                className="bg-slate-900 text-white h-9 px-6 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-brand-600 transition-all shadow-sm active:scale-95 flex items-center justify-center"
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
          <div className="absolute top-20 left-0 w-96 h-96 bg-brand-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-brand-50 border border-brand-100 rounded-full">
              <Star className="w-3 h-3 text-brand-500 fill-brand-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-brand-700 leading-none">The #1 Platform for Scaling Tech Teams</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-slate-900 mb-8 max-w-4xl mx-auto leading-[0.95]">
              Orchestrate <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Greatness.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed font-medium">
              SyncPro merges mission-critical task management with high-fidelity analytics to turn chaos into clarity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/signup" 
                className="w-full sm:w-auto bg-slate-900 text-white h-12 px-10 rounded-lg font-bold text-[11px] flex items-center justify-center gap-2.5 hover:bg-brand-600 transition-all shadow-lg active:scale-95 group uppercase tracking-widest"
              >
                Sign Up Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto bg-white text-slate-600 border border-slate-200 h-12 px-10 rounded-lg font-bold text-[11px] hover:bg-slate-50 transition-all active:scale-95 uppercase tracking-widest">
                Watch Demo
              </button>
            </div>
            
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} className="w-8 h-8 rounded-lg border-2 border-[#fcfcfd]" alt="user" />
                ))}
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">+ 10k Active Managers</p>
            </div>
          </motion.div>

          {/* Premium Product Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="relative rounded-2xl p-2 bg-slate-200/50 shadow-2xl overflow-hidden group">
              <div className="rounded-xl overflow-hidden border border-white/50 bg-white">
                 <img 
                  src="https://images.unsplash.com/photo-1551288049-bbda48338787?auto=format&fit=crop&q=80&w=2426" 
                  alt="SyncPro Dashboard" 
                  className="w-full opacity-90 group-hover:scale-[1.01] transition-transform duration-1000"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section id="features" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">The Core Protocol.</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Engineered for high-velocity teams who demand precision and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-slate-800/40 border border-slate-700/50 p-10 rounded-2xl relative overflow-hidden group">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-brand-600/20 text-brand-400 rounded-xl flex items-center justify-center mb-6">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Neural Kanban</h3>
                  <p className="text-base text-slate-400 max-w-lg mb-8 leading-relaxed">
                    SyncPro rearranged the way we think about work flow. It's not just a board; it's a team brain.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {['Sorting', 'Sync', 'Drag & Drop'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="font-bold text-[10px] tracking-widest uppercase">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-600 to-indigo-700 p-10 rounded-2xl text-white flex flex-col justify-between shadow-xl shadow-brand-500/10 group">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <BarChart className="w-6 h-6" />
              </div>
              <div>
                 <h3 className="text-2xl font-bold mb-3">Deep Analytics</h3>
                 <div className="h-1 bg-white/20 rounded-full overflow-hidden mb-4">
                   <div className="w-3/4 h-full bg-white rounded-full"></div>
                 </div>
                 <p className="text-3xl font-bold mb-1">92.4%</p>
                 <p className="text-[9px] text-brand-200 uppercase font-black tracking-widest">Efficiency Score</p>
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 p-10 rounded-2xl flex flex-col items-center text-center group">
              <div className="w-12 h-12 bg-violet-600/20 text-violet-400 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Vault Privacy</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Enterprise-grade encryption and granular role-based access.
              </p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 p-10 rounded-2xl flex flex-col items-center text-center group">
              <div className="w-12 h-12 bg-emerald-600/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Sync</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Distributed team coordination across every timezone.
              </p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 p-10 rounded-2xl flex flex-col items-center text-center group">
              <div className="w-12 h-12 bg-amber-600/20 text-amber-400 rounded-xl flex items-center justify-center mb-6">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fluid Mobile</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The full power of SyncPro in the palm of your hand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-3xl p-16 md:p-24 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight leading-none italic">Join the Protocol.</h2>
              <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto font-medium">
                SyncPro is not just another PM tool, it's a productivity strategy.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/signup" 
                  className="w-full sm:w-auto bg-white text-slate-900 h-14 px-10 rounded-lg font-bold text-base hover:bg-brand-50 transition-all shadow-xl active:scale-95 flex items-center justify-center uppercase tracking-widest"
                >
                  Start Mission
                </Link>
                <div className="flex items-center gap-2 px-6 h-14 border border-white/20 rounded-lg backdrop-blur-md">
                   <p className="text-white font-bold uppercase tracking-widest text-[9px]">No credit card required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-slate-100 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-6">
                <Command className="w-6 h-6 text-brand-600" />
                <span className="font-display font-bold text-lg tracking-tight">SyncPro</span>
              </div>
              <p className="text-slate-500 text-xs font-medium leading-relaxed max-w-[200px]">
                High-fidelity engineering for team coordination.
              </p>
            </div>
            
            <div>
              <h4 className="text-[9px] font-black text-slate-900 uppercase tracking-widest mb-8">Platform</h4>
              <ul className="space-y-4 text-[10px] font-bold text-slate-400">
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Pricing</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Features</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[9px] font-black text-slate-900 uppercase tracking-widest mb-8">Company</h4>
              <ul className="space-y-4 text-[10px] font-bold text-slate-400">
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">About</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[9px] font-black text-slate-900 uppercase tracking-widest mb-8">Legal</h4>
              <ul className="space-y-4 text-[10px] font-bold text-slate-400">
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Privacy</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Terms</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[9px] font-black text-slate-900 uppercase tracking-widest mb-8">Social</h4>
              <ul className="space-y-4 text-[10px] font-bold text-slate-400">
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Twitter</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">© 2026 SyncPro Protocol Labs.</p>
            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Status:</span>
              <span className="flex items-center gap-1.5 text-emerald-500">
                 <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
                 Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
