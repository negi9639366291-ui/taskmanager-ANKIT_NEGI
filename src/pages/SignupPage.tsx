/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckSquare, ArrowRight, Loader2, UserCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { UserRole } from '../types';
import { cn } from '../lib/utils';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('MEMBER');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setIsLoading(false);
      return;
    }

    try {
      const success = await signup({ name, email, password, role });
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email already exists. Try logging in.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred during signup.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <CheckSquare className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-800">TeamFlow</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-slate-500 mt-2 font-medium">Join thousands of teams shipping faster.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What should we call you?"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-600 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-600 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-600 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Workspace Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('MEMBER')}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-left",
                    role === 'MEMBER' 
                      ? "bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500/20" 
                      : "bg-white border-slate-200 hover:border-slate-300"
                  )}
                >
                  <UserCircle className={cn("w-6 h-6", role === 'MEMBER' ? "text-indigo-600" : "text-slate-400")} />
                  <span className={cn("text-xs font-bold uppercase tracking-wide", role === 'MEMBER' ? "text-indigo-700" : "text-slate-500")}>Member</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('ADMIN')}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-left",
                    role === 'ADMIN' 
                      ? "bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500/20" 
                      : "bg-white border-slate-200 hover:border-slate-300"
                  )}
                >
                  <ShieldCheck className={cn("w-6 h-6", role === 'ADMIN' ? "text-indigo-600" : "text-slate-400")} />
                  <span className={cn("text-xs font-bold uppercase tracking-wide", role === 'ADMIN' ? "text-indigo-700" : "text-slate-500")}>Admin</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
               <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-70"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Create Account <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm font-medium text-slate-500">
              Already have an account? {' '}
              <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700 underline decoration-indigo-200 underline-offset-4">
                Log in
              </Link>
            </p>
          </div>
        </motion.div>
        
        <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
