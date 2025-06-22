'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthStore } from '@/store/auth';
import Image from 'next/image';

type FormData = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { login, register } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  useEffect(() => {
    if (isOpen) {
      reset();
      setError(null);
    }
  }, [isOpen, reset]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError(null); // Reset error trước khi submit
    if (isLogin) {
      const result = await login(data.email, data.password);
      if (!result.success) {
        setError(result.message);
      } else {
        onClose(); // Chỉ đóng modal khi thành công
      }
    } else {
      const result = register(data.email, data.password, data.confirmPassword || '');
      if (!result.success) {
        setError(result.message);
      } else {
        onClose(); // Chỉ đóng modal khi thành công
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl flex overflow-hidden">
        <div className="w-1/2 p-6">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">← Quay lại</button>
          <h2 className="text-2xl font-bold mt-4">
            {isLogin ? 'Đăng nhập bằng email' : 'Đăng ký tài khoản'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Nhập email và mật khẩu tài khoản Tiki' : 'Tạo tài khoản mới'}
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...formRegister('email', {
                  required: 'Email là bắt buộc',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email không hợp lệ',
                  },
                })}
                className="mt-1 block w-full p-2 border rounded-lg"
                placeholder="acbc@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <input
                type="password"
                {...formRegister('password', {
                  required: 'Mật khẩu là bắt buộc',
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu phải có ít nhất 6 ký tự',
                  },
                })}
                className="mt-1 block w-full p-2 border rounded-lg"
                placeholder="Mật khẩu"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  {...formRegister('confirmPassword', {
                    required: 'Xác nhận mật khẩu là bắt buộc',
                    validate: (value) =>
                      value === formRegister('password').value || 'Mật khẩu không khớp',
                  })}
                  className="mt-1 block w-full p-2 border rounded-lg"
                  placeholder="Xác nhận mật khẩu"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            <button
              type="submit"
              className="w-full bg-tiki-red text-white p-2 rounded-lg hover:bg-red-700 transition"
            >
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </form>
          <p className="text-sm text-blue-600 mt-4">
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Chức năng quên mật khẩu!'); }}>
              Quên mật khẩu?
            </a>
          </p>
          <p className="text-sm text-blue-600 mt-2">
            {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
            <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}>
              {isLogin ? 'Tạo tài khoản' : 'Đăng nhập'}
            </a>
          </p>
        </div>
        <div className="w-1/2 bg-blue-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <Image src="/images/tiki-bot.png" alt="Tiki Bot" width={150} height={150} />
            <p className="mt-4 text-gray-600">Mua sắm tại Tiki</p>
            <p className="text-gray-600">Sẽ luôn là điều thú vị</p>
          </div>
        </div>
      </div>
    </div>
  );
}