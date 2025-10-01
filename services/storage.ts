// services/storage.ts
export type Profile = { name: string; phone: string; email: string };
export type Todo = { id: string; text: string; done: boolean };
export type TaskLog = { id: string; title: string; startedAt: number; stoppedAt?: number; durationMs?: number };

const LS = {
  profile: 'ke_profile',
  todos: 'ke_todos',
  logs: 'ke_task_logs',
  users: 'ke_all_users'
};

export const storage = {
  getProfile(): Profile | null {
    const s = localStorage.getItem(LS.profile);
    return s ? JSON.parse(s) : null;
  },
  setProfile(p: Profile) {
    localStorage.setItem(LS.profile, JSON.stringify(p));
    const all = JSON.parse(localStorage.getItem(LS.users) || '[]');
    const exists = all.find((x: Profile) => x.email === p.email);
    if (!exists) all.push(p);
    localStorage.setItem(LS.users, JSON.stringify(all));
  },
  getTodos(): Todo[] {
    return JSON.parse(localStorage.getItem(LS.todos) || '[]');
  },
  setTodos(list: Todo[]) {
    localStorage.setItem(LS.todos, JSON.stringify(list));
  },
  getLogs(): TaskLog[] {
    return JSON.parse(localStorage.getItem(LS.logs) || '[]');
  },
  setLogs(list: TaskLog[]) {
    localStorage.setItem(LS.logs, JSON.stringify(list));
  },
  getAllUsersLocal(): Profile[] {
    return JSON.parse(localStorage.getItem(LS.users) || '[]');
  }
};
