import { create } from 'zustand';

interface AuthState {
  user: any | null;
  setAuth: (user: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setAuth: (user, token) => {
    localStorage.setItem('access_token', token);
    set({ user });
  },
  logout: () => {
    localStorage.removeItem('access_token');
    set({ user: null });
  },
}));
