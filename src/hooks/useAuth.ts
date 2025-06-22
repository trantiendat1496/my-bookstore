import { useAuthStore } from '@/store/auth';

export const useAuth = () => {
  const { user, login, logout } = useAuthStore();
  return { user, login, logout };
};