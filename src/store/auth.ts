import { create } from 'zustand';
import { User } from '@/lib/types';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (email: string, password: string, confirmPassword: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email, password) => {
    try {
      const response = await fetch('http://localhost:8888/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success && data.user) {
        set({ user: { email: data.user.email, token: data.token } });
        return { success: true };
      }
      return { success: false, message: data.message || 'Đăng nhập thất bại!' };
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại!' };
    }
  },
  register: (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return { success: false, message: 'Mật khẩu không khớp!' };
    }
    if (email && password) {
      set({ user: { email } });
      return { success: true };
    }
    return { success: false, message: 'Vui lòng điền đầy đủ thông tin!' };
  },
  logout: () => set({ user: null }),
}));