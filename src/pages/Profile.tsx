/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  Settings, 
  Bell, 
  Lock, 
  ExternalLink,
  Camera,
  CheckCircle2,
  Clock,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { formatDate, cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function Profile() {
  const { user } = useAuth();
  const { tasks, projects } = useData();
  
  const userTasks = tasks.filter(t => t.assignedTo === user?.id);
  const userProjects = projects.filter(p => p.members.includes(user?.id || ''));
  const completedTasks = userTasks.filter(t => t.status === 'COMPLETED');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight uppercase">Your Profile</h1>
        <p className="text-slate-500 font-medium">Manage your personal settings and view your workspace activity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - User Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-32 bg-slate-900 group-hover:bg-indigo-600 transition-colors duration-500"></div>
            
            <div className="relative z-10 pt-8">
              <div className="relative inline-block mb-6">
                <img 
                  src={user?.avatar} 
                  alt={user?.name} 
                  className="w-32 h-32 rounded-[2.5rem] border-4 border-white shadow-xl object-cover bg-white"
                />
                <button className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-lg border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{user?.name}</h2>
              <p className="text-slate-400 font-medium mb-6 uppercase tracking-widest text-[10px]">{user?.role} — TeamFlow</p>
              
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Active Now</div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-slate-50 pt-8">
                <div>
                  <p className="text-xl font-bold text-slate-900">{userTasks.length}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tasks</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">{userProjects.length}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Projects</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">{completedTasks.length}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Done</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Account Details</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Work Email</p>
                  <p className="text-sm font-bold text-slate-700">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Member Since</p>
                  <p className="text-sm font-bold text-slate-700">{formatDate(user?.joinedAt || '')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tabs/Settings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-100">
              <button className="px-8 py-5 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600">Overview</button>
              <button className="px-8 py-5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Settings</button>
              <button className="px-8 py-5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Security</button>
              <button className="px-8 py-5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Privacy</button>
            </div>
            
            <div className="p-8 space-y-10">
              {/* Personal Statistics */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Focus Metrics
                  </h4>
                  <button className="text-xs font-bold text-indigo-600 hover:underline underline-offset-4">Customize view</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-[2rem] bg-indigo-50/50 border border-indigo-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 font-extrabold text-indigo-600 text-2xl">
                      84%
                    </div>
                    <div>
                      <p className="text-sm font-bold text-indigo-900">Task Completion</p>
                      <p className="text-xs font-medium text-slate-500 mt-1">Excellent productivity index this week.</p>
                    </div>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-amber-50/50 border border-amber-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-100 font-extrabold text-amber-600 text-2xl">
                      3.2h
                    </div>
                    <div>
                      <p className="text-sm font-bold text-amber-900">Avg. Task Duration</p>
                      <p className="text-xs font-medium text-slate-500 mt-1">Maintaining a steady workflow flow.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Preferences */}
              <section className="space-y-6">
                <h4 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-3">
                  <Settings className="w-5 h-5 text-slate-400" />
                  Workspace Preferences
                </h4>
                <div className="space-y-4">
                  {[
                    { icon: Bell, label: 'Email Notifications', desc: 'Get daily summaries of your task activity.', active: true },
                    { icon: Lock, label: 'Two-Factor Auth', desc: 'Secure your account with 2FA.', active: false },
                    { icon: Clock, label: 'Time Tracking', desc: 'Record time spent on specific tasks.', active: true },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 px-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm">
                          <item.icon className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{item.label}</p>
                          <p className="text-xs font-medium text-slate-400">{item.desc}</p>
                        </div>
                      </div>
                      <div className={cn(
                        "w-12 h-6 rounded-full relative transition-colors cursor-pointer",
                        item.active ? "bg-indigo-600" : "bg-slate-300"
                      )}>
                        <div className={cn(
                          "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                          item.active ? "right-1" : "left-1"
                        )}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
