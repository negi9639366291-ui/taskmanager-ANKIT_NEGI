import React from 'react';

interface AvatarProps {
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const colors = [
  'bg-emerald-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-violet-500',
  'bg-orange-500',
  'bg-rose-500',
  'bg-slate-500',
];

const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const sizes = {
  'xs': 'w-6 h-6 text-[10px]',
  'sm': 'w-8 h-8 text-xs',
  'md': 'w-9 h-9 text-sm',
  'lg': 'w-10 h-10 text-base',
  'xl': 'w-12 h-12 text-lg',
};

export const Avatar: React.FC<AvatarProps> = ({ name = '?', size = 'md', className = '' }) => {
  const initial = name.charAt(0).toUpperCase();
  const colorClass = getAvatarColor(name);
  const sizeClass = sizes[size];

  return (
    <div className={`${sizeClass} ${colorClass} rounded-full flex items-center justify-center text-white font-bold leading-none shadow-inner border border-white/10 shrink-0 ${className} select-none`}>
      {initial}
    </div>
  );
};
