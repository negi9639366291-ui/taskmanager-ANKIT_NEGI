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
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-slate-200/40 rounded-[2rem] px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 rotate-3 transform group">
                <Command className="text-white w-6 h-6 group-hover:rotate-12 transition-transform" />
              </div>
              <span className="font-display font-black text-xl tracking-tighter text-slate-900">SyncPro</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-10">
              <a href="#features" className="text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors uppercase tracking-widest">Platform</a>
              <a href="#solutions" className="text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors uppercase tracking-widest">Solutions</a>
              <a href="#pricing" className="text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors uppercase tracking-widest">Resources</a>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest mr-4">Log in</Link>
              <Link 
                to="/signup" 
                className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-sm font-bold hover:bg-brand-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Hero Section */}
      <section className="relative pt-48 pb-32 px-6 lg:pt-64 lg:pb-48">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
          <div className="absolute top-20 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-brand-50 border border-brand-100 rounded-full">
              <Star className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-700">The #1 Platform for Scaling Tech Teams</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tight text-slate-900 mb-10 max-w-5xl mx-auto leading-[0.9] lg:leading-[0.85]">
              Orchestrate <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600">Greatness.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              SyncPro merges mission-critical task management with high-fidelity analytics to turn chaos into clarity. Ship faster, together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/signup" 
                className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-brand-600 transition-all shadow-[0_20px_50px_rgba(30,27,75,0.15)] active:scale-95 group"
              >
                Sign Up Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto bg-white text-slate-600 border-2 border-slate-100 px-10 py-5 rounded-3xl font-black text-lg hover:bg-slate-50 transition-all active:scale-95">
                Watch Demo
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} className="w-10 h-10 rounded-xl border-4 border-[#fcfcfd]" alt="user" />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">+ 10k Active Managers</p>
            </div>
          </motion.div>

          {/* Premium Product Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-32 relative mx-auto max-w-6xl"
          >
            <div className="relative rounded-[3rem] p-3 bg-gradient-to-b from-slate-200 to-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] group">
              <div className="rounded-[2.2rem] overflow-hidden border border-white/50 bg-[#f8fafc]">
                 <img 
                  src="https://images.unsplash.com/photo-1551288049-bbda48338787?auto=format&fit=crop&q=80&w=2426" 
                  alt="SyncPro Dashboard" 
                  className="w-full opacity-90 group-hover:scale-[1.01] transition-transform duration-1000"
                />
              </div>
              
              {/* Floating UI Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-10 -right-10 bg-white p-5 rounded-3xl shadow-2xl border border-slate-100 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Velocity</p>
                    <p className="text-lg font-black text-slate-900">+ 42% Increased</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section id="features" className="py-48 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tight">The Core Protocol.</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Every feature is engineered for high-velocity teams who demand precision and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-slate-800/50 border border-slate-700/50 p-12 rounded-[3.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-brand-600/20 text-brand-400 rounded-2xl flex items-center justify-center mb-8">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Neural Kanban</h3>
                  <p className="text-lg text-slate-400 max-w-lg mb-8 italic">
                    "SyncPro rearranged the way we think about work flow. It's not just a board; it's a team brain."
                  </p>
                </div>
                <div className="space-y-4">
                  {['Intelligent sorting', 'Cross-project sync', 'Real-time drag & drop'].map(f => (
                    <div key={f} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="font-bold text-sm tracking-wide uppercase">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-600 to-indigo-700 p-12 rounded-[3.5rem] text-white flex flex-col justify-between shadow-2xl shadow-brand-500/20 group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                <BarChart className="w-8 h-8" />
              </div>
              <div>
                 <h3 className="text-3xl font-display font-bold mb-4">Deep Analytics</h3>
                 <p className="text-brand-100 text-sm leading-relaxed font-bold uppercase tracking-widest mb-6">Real-time stats</p>
                 <div className="h-1 bg-white/20 rounded-full overflow-hidden mb-4">
                   <div className="w-3/4 h-full bg-white rounded-full"></div>
                 </div>
                 <p className="text-4xl font-black mb-2">92.4%</p>
                 <p className="text-xs text-brand-200 uppercase font-black tracking-[0.2em]">Team Efficiency Score</p>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 p-12 rounded-[3.5rem] flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-violet-600/20 text-violet-400 rounded-2xl flex items-center justify-center mb-8">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Vault Privacy</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Enterprise-grade encryption and granular role-based access to keep your secrets where they belong.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 p-12 rounded-[3.5rem] flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-emerald-600/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-8">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Global Sync</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Co-ordinate your distributed team across every timezone with instant event broadcasting.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 p-12 rounded-[3.5rem] flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-amber-600/20 text-amber-400 rounded-2xl flex items-center justify-center mb-8">
                <Layout className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Fluid Mobile</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The full power of SyncPro in the palm of your hand. Never miss a beat when you're on the move.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="py-48 px-6 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-600/20 via-transparent to-violet-500/20"></div>
            <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-10 tracking-tighter leading-none italic">Join the Protocol.</h2>
              <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto font-medium">
                SyncPro is not just another PM tool, it's a productivity strategy. Let's build something great.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  to="/signup" 
                  className="w-full sm:w-auto bg-white text-slate-900 px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-brand-50 transition-all shadow-2xl active:scale-95"
                >
                  Start Your Mission
                </Link>
                <div className="flex items-center gap-3 px-8 py-5 border border-white/20 rounded-[2rem] backdrop-blur-md">
                   <p className="text-white font-bold uppercase tracking-widest text-xs">No credit card required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 border-t border-slate-100 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-32">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <Command className="w-8 h-8 text-brand-600" />
                <span className="font-display font-black text-xl tracking-tight">SyncPro</span>
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">
                Refining the standard of team coordination through high-fidelity engineering.
              </p>
            </div>
            
            <div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-10">Platform</h4>
              <ul className="space-y-6 text-sm font-bold text-slate-500">
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Pricing</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Features</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Ecosystem</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-10">Company</h4>
              <ul className="space-y-6 text-sm font-bold text-slate-500">
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">About</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Careers</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Newsroom</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-10">Legal</h4>
              <ul className="space-y-6 text-sm font-bold text-slate-500">
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Privacy</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Terms</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Cookies</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-10">Social</h4>
              <ul className="space-y-6 text-sm font-bold text-slate-500">
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">X / Twitter</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">LinkedIn</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors uppercase tracking-widest">Instagram</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2026 SyncPro Protocol Labs. All units synchronized.</p>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>Status:</span>
              <span className="flex items-center gap-1.5 text-emerald-500">
                 <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                 All systems operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
