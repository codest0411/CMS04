import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api.js';
import { toast } from 'sonner';

const initialState = {
  user: null,
  tokens: null,
  loading: false,
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      login: async (credentials) => {
        try {
          set({ loading: true });
          const response = await api.post('/auth/login', credentials);
          const { accessToken, refreshToken, user } = response.data.data;
          set({
            user,
            tokens: { accessToken, refreshToken },
            loading: false,
          });
          toast.success('✨ Logged in. Welcome back.');
          return true;
        } catch (error) {
          set({ loading: false });
          const message = error.response?.data?.message || 'Login failed.';
          toast.error(`🚫 ${message}`);
          return false;
        }
      },
      refresh: async () => {
        const refreshToken = get().tokens?.refreshToken;
        if (!refreshToken) return null;
        try {
          const response = await api.post('/auth/refresh', { refreshToken });
          const { accessToken: newAccess, refreshToken: newRefresh } = response.data.data;
          set({
            tokens: { accessToken: newAccess, refreshToken: newRefresh },
          });
          return newAccess;
        } catch (error) {
          set({ user: null, tokens: null });
          return null;
        }
      },
      logout: () => {
        set(initialState);
        toast('👋 You have been logged out.');
      },
    }),
    {
      name: 'cms-auth',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
      }),
    }
  )
);
