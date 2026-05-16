/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppData, User, Project, Task, Notification, Activity, UserRole } from '../types';

const STORAGE_KEY = 'teamflow_data';
const CURRENT_USER_KEY = 'teamflow_current_user';

const INITIAL_DATA: AppData = {
  users: [
    {
      id: 'u1',
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'ADMIN',
      joinedAt: new Date().toISOString(),
    },
    {
      id: 'u2',
      name: 'John Member',
      email: 'member@example.com',
      password: 'password123',
      role: 'MEMBER',
      joinedAt: new Date().toISOString(),
    },
    {
      id: 'u3',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      password: 'password123',
      role: 'MEMBER',
      joinedAt: new Date().toISOString(),
    }
  ],
  projects: [
    {
      id: 'p1',
      name: 'Website Redesign',
      description: 'Overhaul the company landing page with modern aesthetics.',
      status: 'ACTIVE',
      createdBy: 'u1',
      members: ['u1', 'u2', 'u3'],
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'p2',
      name: 'Mobile App Launch',
      description: 'Prepare the marketing campaign for the iOS/Android launch.',
      status: 'ACTIVE',
      createdBy: 'u1',
      members: ['u1', 'u2'],
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ],
  tasks: [
    {
      id: 't1',
      title: 'Design Hero Section',
      description: 'Create high-fidelity mockups for the landing page hero.',
      projectId: 'p1',
      assignedTo: 'u2',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 't2',
      title: 'Setup Analytics',
      description: 'Implement tracking for core user behaviors.',
      projectId: 'p1',
      assignedTo: 'u3',
      status: 'PENDING',
      priority: 'MEDIUM',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 't3',
      title: 'Bug Bash',
      description: 'Final testing round before production release.',
      projectId: 'p2',
      assignedTo: 'u1',
      status: 'COMPLETED',
      priority: 'LOW',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  notifications: [],
  activities: []
};

export const storage = {
  getData: (): AppData => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(data);
  },

  setData: (data: AppData): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  // Helpers
  updateUser: (user: User) => {
    const data = storage.getData();
    data.users = data.users.map(u => u.id === user.id ? user : u);
    storage.setData(data);
  },

  addActivity: (userId: string, action: string, targetId: string, targetType: Activity['targetType']) => {
    const data = storage.getData();
    const activity: Activity = {
      id: Math.random().toString(36).substring(2, 9),
      userId,
      action,
      targetId,
      targetType,
      createdAt: new Date().toISOString()
    };
    data.activities.unshift(activity);
    if (data.activities.length > 50) data.activities.pop();
    storage.setData(data);
  }
};
