/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  ArrowRight, 
  Zap, 
  Shield, 
  BarChart, 
  Smartphone,
  CheckCircle2,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">TeamFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#solutions" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Solutions</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Log in</Link>
            <Link 
              to="/signup" 
              className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 rounded-full">
              Seamless Project Management
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 max-w-4xl mx-auto leading-[1.1]">
              Manage tasks with <span className="text-indigo-600 italic">velocity</span> and precision.
            </h1>
            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              TeamFlow is the ultimate destination for modern teams. Orchestrate your projects, boost productivity, and hit every deadline with ease.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/signup" 
                className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl"
              >
                Start for free <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto bg-white text-slate-600 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all">
                Book a demo
              </button>
            </div>
          </motion.div>

          {/* Feature Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative px-4"
          >
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-5xl group">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
                alt="Dashboard Preview" 
                className="w-full grayscale-[0.2] transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
            {/* Floating UI Elements for decor */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">Trusted by the world's most innovative teams</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center opacity-40 grayscale group-hover:grayscale-0">
            {/* Logos placeholders */}
            <div className="font-bold text-2xl text-slate-800">Stellar</div>
            <div className="font-bold text-2xl text-slate-800">Acme</div>
            <div className="font-bold text-2xl text-slate-800">Flowy</div>
            <div className="font-bold text-2xl text-slate-800">Helix</div>
            <div className="font-bold text-2xl text-slate-800">Cloud9</div>
            <div className="font-bold text-2xl text-slate-800">Nexus</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Everything you need to ship faster.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Our platform combines powerful features with an intuitive design to help your team work smarter, not harder.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Zap, 
                title: 'High-Velocity Kanban', 
                desc: 'Drag, drop, and organize tasks in seconds with our optimized kanban boards.',
                color: 'bg-amber-100 text-amber-600'
              },
              { 
                icon: BarChart, 
                title: 'Live Analytics', 
                desc: 'Real-time insights into team productivity, task completion rates, and project health.',
                color: 'bg-blue-100 text-blue-600'
              },
              { 
                icon: Shield, 
                title: 'Role-Based Control', 
                desc: 'Securely manage your data with granular permissions for admins and members.',
                color: 'bg-emerald-100 text-emerald-600'
              },
              { 
                icon: Users, 
                title: 'Team Collaboration', 
                desc: 'Contextual comments, activity feeds, and shared dashboards to keep everyone in sync.',
                color: 'bg-purple-100 text-purple-600'
              },
              { 
                icon: Smartphone, 
                title: 'Fully Responsive', 
                desc: 'Manage your projects from anywhere - whether you are on mobile, tablet, or desktop.',
                color: 'bg-red-100 text-red-600'
              },
              { 
                icon: CheckCircle2, 
                title: 'Goal Tracking', 
                desc: 'Define milestones and track project progress with automated status reporting.',
                color: 'bg-indigo-100 text-indigo-600'
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-2xl mb-6 flex items-center justify-center`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Ready to transform your team?</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of teams already using TeamFlow to manage their work and achieve their goals.
            </p>
            <Link 
              to="/signup" 
              className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-xl"
            >
              Get started for free
            </Link>
          </div>
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/30 rounded-full -ml-20 -mb-20 blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <CheckSquare className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">TeamFlow</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Making project management simple, visual, and high-velocity for modern teams worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Security</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-400 font-medium">© 2026 TeamFlow Inc. All rights reserved.</p>
          <div className="flex gap-6 italic text-slate-400 text-xs font-semibold">
            <span>Built by Google AI Studio Build</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
