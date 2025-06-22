'use client';

import { useCartStore } from '@/store/cart';

interface AddToCartButtonProps {
  bookId: string;
  bookName: string;
  bookPrice: number;
}

export default function AddToCartButton({ bookId, bookName, bookPrice }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: bookId,
      title: bookName,
      price: bookPrice,
      quantity: 1,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-tiki-red text-white px-4 py-2 rounded-lg mt-4 bg-red-700 transition"
    >
      Thêm vào giỏ
    </button>
  );
}