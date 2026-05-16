/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AppData, Project, Task, User, Notification, Activity, TaskStatus, TaskPriority } from '../types';
import { storage } from '../utils/storage';
import { useAuth } from './AuthContext';

interface DataContextType {
  data: AppData;
  projects: Project[];
  tasks: Task[];
  team: User[];
  notifications: Notification[];
  activities: Activity[];
  
  // Project Actions
  addProject: (project: Partial<Project>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Task Actions
  addTask: (task: Partial<Task>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // Notification Actions
  markNotificationAsRead: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [data, setData] = useState<AppData>(storage.getData());

  const refreshData = useCallback(() => {
    setData(storage.getData());
  }, []);

  const addProject = (projectData: Partial<Project>) => {
    if (!user) return;
    const newData = storage.getData();
    const newProject: Project = {
      id: Math.random().toString(36).substring(2, 9),
      name: projectData.name || 'Untitled Project',
      description: projectData.description || '',
      status: projectData.status || 'ACTIVE',
      createdBy: user.id,
      members: projectData.members || [user.id],
      createdAt: new Date().toISOString(),
      dueDate: projectData.dueDate || new Date().toISOString(),
    };
    
    newData.projects.push(newProject);
    storage.setData(newData);
    storage.addActivity(user.id, `created project "${newProject.name}"`, newProject.id, 'PROJECT');
    refreshData();
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    if (!user) return;
    const newData = storage.getData();
    newData.projects = newData.projects.map(p => p.id === id ? { ...p, ...updates } : p);
    storage.setData(newData);
    
    const project = newData.projects.find(p => p.id === id);
    if (project) {
      storage.addActivity(user.id, `updated project "${project.name}"`, project.id, 'PROJECT');
    }
    refreshData();
  };

  const deleteProject = (id: string) => {
    if (!user) return;
    const newData = storage.getData();
    const project = newData.projects.find(p => p.id === id);
    newData.projects = newData.projects.filter(p => p.id !== id);
    newData.tasks = newData.tasks.filter(t => t.projectId !== id);
    storage.setData(newData);
    
    if (project) {
      storage.addActivity(user.id, `deleted project "${project.name}"`, id, 'PROJECT');
    }
    refreshData();
  };

  const addTask = (taskData: Partial<Task>) => {
    if (!user) return;
    const newData = storage.getData();
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      title: taskData.title || 'Untitled Task',
      description: taskData.description || '',
      projectId: taskData.projectId || '',
      assignedTo: taskData.assignedTo || user.id,
      status: taskData.status || 'PENDING',
      priority: taskData.priority || 'MEDIUM',
      dueDate: taskData.dueDate || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    newData.tasks.push(newTask);
    storage.setData(newData);
    storage.addActivity(user.id, `created task "${newTask.title}"`, newTask.id, 'TASK');
    refreshData();
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    if (!user) return;
    const newData = storage.getData();
    newData.tasks = newData.tasks.map(t => 
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    );
    storage.setData(newData);
    
    const task = newData.tasks.find(t => t.id === id);
    if (task) {
      storage.addActivity(user.id, `updated task "${task.title}"`, task.id, 'TASK');
    }
    refreshData();
  };

  const deleteTask = (id: string) => {
    if (!user) return;
    const newData = storage.getData();
    const task = newData.tasks.find(t => t.id === id);
    newData.tasks = newData.tasks.filter(t => t.id !== id);
    storage.setData(newData);
    
    if (task) {
      storage.addActivity(user.id, `deleted task "${task.title}"`, id, 'TASK');
    }
    refreshData();
  };

  const markNotificationAsRead = (id: string) => {
    const newData = storage.getData();
    newData.notifications = newData.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    storage.setData(newData);
    refreshData();
  };

  return (
    <DataContext.Provider value={{
      data,
      projects: data.projects,
      tasks: data.tasks,
      team: data.users,
      notifications: data.notifications,
      activities: data.activities,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      updateTask,
      deleteTask,
      markNotificationAsRead
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
