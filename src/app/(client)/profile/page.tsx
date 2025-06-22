'use client';

import { useAuthStore } from '@/store/auth';

export default function Profile() {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-tiki-red">Hồ sơ của tôi</h1>
      {user ? (
        <div className="space-y-2">
          <p>Email: {user.email}</p>
          <p>Tên: {user.name || 'Chưa cập nhật'}</p>
        </div>
      ) : (
        <p>Vui lòng đăng nhập để xem thông tin.</p>
      )}
    </div>
  );
}