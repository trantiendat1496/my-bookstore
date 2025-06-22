'use client';

import { useCartStore } from '@/store/cart';
import Link from 'next/link';

export default function Cart() {
  const { items, removeItem, updateQuantity } = useCartStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-tiki-red">Giỏ hàng</h1>
      {items.length === 0 ? (
        <p className="text-center">Giỏ hàng trống</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <p>{item.title}</p>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  className="w-16 p-1 border rounded"
                  min="1"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
          <Link
            href="/confirm"
            className="bg-tiki-red text-white px-4 py-2 rounded-lg bg-red-700 transition cursor-pointer"
          >
            Thanh toán
          </Link>
        </div>
      )}
    </div>
  );
}