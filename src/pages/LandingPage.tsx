import { useState, useEffect } from 'react';
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
  ChevronRight,
  Menu,
  X,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar } from '../components/Avatar';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#platform' },
    { name: 'Dashboard Preview', href: '#preview' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] font-sans text-slate-400 overflow-x-hidden selection:bg-brand-500/30">
      {/* Premium Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`bg-black/40 backdrop-blur-2xl border border-white/[0.05] shadow-2xl rounded-2xl px-6 md:px-8 py-3 flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-black/60 shadow-brand-500/5' : ''}`}>
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-brand-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:scale-110 transition-all group-hover:rotate-6">
                <Command className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl tracking-tighter text-white leading-none italic">TASK MANAGER</span>
                <span className="text-[7px] text-slate-600 uppercase tracking-[0.4em] font-black mt-1">Intelligence Protocol</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-[10px] font-black text-slate-700 hover:text-white transition-all uppercase tracking-[0.2em]"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                <Link 
                  to="/login" 
                  className="px-6 py-2.5 text-[10px] font-black text-slate-500 hover:text-white border border-white/5 hover:bg-white/[0.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] rounded-xl transition-all uppercase tracking-[0.2em]"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white h-11 px-8 rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_10px_30px_rgba(99,102,241,0.2)] hover:shadow-brand-500/40 active:scale-95 border border-white/10"
                >
                  Join Matrix
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-4 px-6 lg:hidden"
            >
              <div className="bg-black/90 backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-8 shadow-2xl flex flex-col gap-6">
                {navLinks.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xs font-black text-slate-700 hover:text-brand-400 transition-all uppercase tracking-[1em] text-center"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="h-px bg-white/5 my-2" />
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/login" 
                    className="w-full py-4 text-[10px] font-black text-slate-700 hover:text-white border border-white/5 rounded-2xl transition-all uppercase tracking-[0.4em] text-center"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="w-full bg-brand-600 py-4 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.4em] text-center shadow-lg"
                  >
                    Join Matrix
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
          <div className="absolute top-40 left-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-40 right-0 w-[700px] h-[700px] bg-violet-500/10 rounded-full blur-[180px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 bg-brand-500/5 border border-brand-500/20 rounded-full backdrop-blur-md">
              <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-400 leading-none">Global Deployment v4.2 Deployment Active</span>
            </div>
            
            <p className="text-brand-500 font-black text-[10px] uppercase tracking-[0.6em] mb-6 italic">Tactical Intelligence Cluster</p>

            <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter text-white mb-8 max-w-6xl mx-auto leading-[0.85] text-balance italic uppercase">
              Mission <br className="hidden md:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-500 to-violet-500">Critical.</span>
            </h1>
            
            <p className="text-sm md:text-base text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-bold uppercase tracking-[0.4em]">
              Manage projects, teams, and productivity with a modern enterprise workflow platform designed for high-performance collaboration.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link 
                to="/signup" 
                className="w-full sm:w-auto bg-white text-black h-16 px-12 rounded-2xl font-black text-[11px] flex items-center justify-center gap-4 hover:bg-brand-500 hover:text-white transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95 group uppercase tracking-[0.4em] border border-white/10"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto bg-white/[0.02] text-slate-500 border border-white/5 h-16 px-12 rounded-2xl font-black text-[11px] hover:bg-white/5 hover:text-white transition-all active:scale-95 uppercase tracking-[0.4em] backdrop-blur-md flex items-center justify-center gap-3">
                <Play className="w-4 h-4" />
                Live Demo
              </button>
            </div>
            
            <div className="flex flex-col items-center gap-6">
              <div className="flex -space-x-4">
                {['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'].map(name => (
                  <Avatar key={name} name={name} size="md" className="border-4 border-[#0B0B0F] shadow-2xl scale-110 hover:scale-125 transition-transform cursor-pointer" />
                ))}
              </div>
              <p className="text-[9px] font-black text-slate-800 uppercase tracking-[0.4em]">Integrated by 12,400+ Strategic Operational Units</p>
            </div>
          </motion.div>


          {/* Premium Product Preview */}
          <motion.div 
            id="preview"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-24 relative mx-auto max-w-6xl scroll-mt-32"
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
      <section id="platform" className="py-48 bg-[#0B0B0F] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.05),transparent_70%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter italic">Tactical Protocol.</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-black uppercase tracking-[0.4em] text-[12px]">
              Engineered for high-velocity units demanding absolute operational precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white/[0.01] border border-white/[0.03] p-16 rounded-[3rem] relative overflow-hidden group shadow-3xl backdrop-blur-md hover:bg-white/[0.02] transition-colors">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-brand-500/10 text-brand-400 rounded-2xl flex items-center justify-center mb-10 border border-brand-500/20 shadow-2xl">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-display font-black text-white mb-6 tracking-tight italic">Project Neural Matrix</h3>
                  <p className="text-xl text-slate-600 max-w-lg mb-12 leading-relaxed font-bold uppercase tracking-tight">
                    Task Manager reconfigures the way you think about mission flow. It's an intelligent neural assistant for your team.
                  </p>
                </div>
                <div className="flex flex-wrap gap-10">
                  {['Intelligent Synthesis', 'Real-time Flux', 'Adaptive Protocols'].map(f => (
                    <div key={f} className="flex items-center gap-4 text-slate-500 group/item">
                      <CheckCircle2 className="w-6 h-6 text-brand-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                      <span className="font-black text-[10px] tracking-[0.3em] uppercase group-hover/item:text-white transition-colors">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-brand-600/5 rounded-full blur-[120px] pointer-events-none transition-all group-hover:bg-brand-600/10"></div>
            </div>

            <div className="bg-gradient-to-br from-brand-600 to-[#1e1b4b] p-16 rounded-[3rem] text-white flex flex-col justify-between shadow-[0_30px_100px_rgba(99,102,241,0.3)] group transition-all hover:-translate-y-2 border border-white/10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-10 border border-white/20 shadow-2xl">
                <BarChart className="w-8 h-8" />
              </div>
              <div>
                 <h3 className="text-4xl font-display font-black mb-6 tracking-tight italic">Deep Intel</h3>
                 <div className="h-3 bg-black/40 rounded-full overflow-hidden mb-8 border border-white/10">
                   <div className="w-3/4 h-full bg-white rounded-full shadow-[0_0_25px_rgba(255,255,255,0.8)]"></div>
                 </div>
                 <p className="text-7xl font-display font-black mb-3 tracking-tighter italic">98.2%</p>
                 <p className="text-[11px] text-white/50 uppercase font-black tracking-[0.4em]">Efficiency Threshold</p>
              </div>
            </div>

            <div className="bg-white/[0.01] border border-white/[0.03] p-12 rounded-[3rem] flex flex-col items-center text-center group transition-all hover:bg-white/[0.03] backdrop-blur-md shadow-2xl">
              <div className="w-16 h-16 bg-violet-500/10 text-violet-400 rounded-2xl flex items-center justify-center mb-10 border border-violet-500/20">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white mb-5 tracking-[0.3em] uppercase italic">Vault Protocol</h3>
              <p className="text-slate-600 text-[11px] leading-relaxed font-bold uppercase tracking-widest">
                End-to-end tactical encryption and ultra-granular role-based access for your strategic assets.
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/[0.03] p-12 rounded-[3rem] flex flex-col items-center text-center group transition-all hover:bg-white/[0.03] backdrop-blur-md shadow-2xl">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-10 border border-emerald-500/20">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white mb-5 tracking-[0.3em] uppercase italic">Nexus Cluster</h3>
              <p className="text-slate-600 text-[11px] leading-relaxed font-bold uppercase tracking-widest">
                Distributed coordination protocols across every hemisphere and secure timezone node.
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/[0.03] p-12 rounded-[3rem] flex flex-col items-center text-center group transition-all hover:bg-white/[0.03] backdrop-blur-md shadow-2xl">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mb-10 border border-amber-500/20">
                <Layout className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white mb-5 tracking-[0.3em] uppercase italic">Flux Core UI</h3>
              <p className="text-slate-600 text-[11px] leading-relaxed font-bold uppercase tracking-widest">
                The full tactical power of the Task Manager engine optimized for high-intensity mobile operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="py-48 px-6 relative overflow-hidden bg-[#0B0B0F]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/[0.01] border border-white/[0.03] rounded-[5rem] p-24 md:p-48 text-center relative overflow-hidden backdrop-blur-3xl shadow-3xl">
            <div className="relative z-10">
              <h2 className="text-6xl md:text-9xl font-display font-black text-white mb-12 tracking-tighter leading-none italic uppercase">Join the Elite.</h2>
              <p className="text-slate-600 text-xl mb-16 max-w-xl mx-auto font-black uppercase tracking-[0.4em] text-[14px]">
                Task Manager is the master deployment strategy for world-class technical squads.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                <Link 
                  to="/signup" 
                  className="w-full sm:w-auto bg-white text-black h-20 px-24 rounded-3xl font-black text-[14px] hover:bg-brand-500 hover:text-white transition-all shadow-3xl active:scale-95 flex items-center justify-center uppercase tracking-[0.4em] border border-white/10"
                >
                  Enter Protocol
                </Link>
                <div className="flex items-center gap-6 px-12 h-20 border border-white/5 rounded-3xl bg-white/[0.01] backdrop-blur-xl">
                   <p className="text-slate-800 font-black uppercase tracking-[0.5em] text-[11px]">Deployment Active</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600/5 rounded-full blur-[200px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-48 px-6 border-t border-white/[0.02] bg-[#050507]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-24 mb-32">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4 mb-10 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="w-10 h-10 bg-brand-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  <Command className="w-6 h-6 text-white" />
                </div>
                <span className="font-display font-black text-2xl tracking-tighter text-white leading-none italic">TASK MANAGER</span>
              </div>
              <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.4em] leading-relaxed max-w-[240px]">
                High-fidelity engineering for advanced strategic coordination.
              </p>
            </div>
            
            {[
              { title: 'Protocol', links: ['Synthesis', 'Automation', 'Flux', 'Neural'] },
              { title: 'Nexus', links: ['Intelligence', 'Network', 'Ecosystem', 'Nodes'] },
              { title: 'Compliance', links: ['AES-256', 'Integrity', 'Vault', 'Cipher'] },
              { title: 'Connect', links: ['Terminal', 'Satellite', 'Briefings', 'HQ'] }
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-[11px] font-black text-slate-200 uppercase tracking-[0.5em] mb-12 italic">{col.title}</h4>
                <ul className="space-y-6 text-[10px] font-black text-slate-700">
                  {col.links.map(link => (
                    <li key={link}><a href="#" className="hover:text-brand-400 transition-all uppercase tracking-[0.3em]">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-16 border-t border-white/[0.02] flex flex-col md:flex-row justify-between items-center gap-12">
            <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.6em] italic">© 2026 TASK MANAGER INTELLIGENCE LABS. ALL UNITS SECURED.</p>
            <div className="flex items-center gap-6 text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">
              <span>CORE STATUS:</span>
              <span className="flex items-center gap-3 text-brand-500 bg-brand-500/5 px-6 py-2 rounded-full border border-brand-500/10">
                 <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(99,102,241,1)]"></span>
                 FULLY OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
