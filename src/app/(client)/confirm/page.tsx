'use client';

import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';

export default function Confirm() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();

  const handleConfirm = () => {
    clearCart();
    alert('Đơn hàng đã được xác nhận!');
    router.push('/profile');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-tiki-red">Xác nhận đơn hàng</h1>
      <p>Tổng số sản phẩm: {items.length}</p>
      <button
        onClick={handleConfirm}
        className="bg-tiki-red text-white px-4 py-2 rounded-lg mt-4 bg-red-700 transition"
      >
        Xác nhận
      </button>
    </div>
  );
}