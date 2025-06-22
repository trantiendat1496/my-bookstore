'use client';

import Link from 'next/link';
import { Book } from '@/lib/types';
import { useCartStore } from '@/store/cart';
import Image from 'next/image';

export default function BookCard({ book }: { book: Book }) {
  const { addItem } = useCartStore();
  const discount = book.list_price ? Math.round(((book.list_price - book.price) / book.list_price) * 100) : 0;
  const originalPrice = book.list_price || book.price;
  const isNew = Math.random() > 0.5; // Giả lập trạng thái "NEW"
  const isTopDeal = Math.random() > 0.7; // Giả lập trạng thái "TOP DEAL"
  const isFreeShip = Math.random() > 0.8; // Giả lập trạng thái "FREE SHIP XTRA"

  return (
    <div className="border rounded-lg p-2 shadow hover:shadow-lg transition-shadow">
      <Link href={`/books/${book.id}`}>
        <Image
          src={book.images[0]?.thumbnail_url || '/images/placeholder.jpg'}
          alt={book.name}
          width={150}
          height={200}
          className="w-full h-48 object-cover rounded"
        />
      </Link>
      <div className="mt-2">
        {isNew && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">NOW</span>}
        {isTopDeal && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded ml-2">TOP DEAL</span>}
        {isFreeShip && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-2">FREE SHIP XTRA</span>}
        <h3 className="text-sm font-semibold mt-2 line-clamp-2">
          <Link href={`/books/${book.id}`} className="text-blue-600 hover:underline">{book.name}</Link>
        </h3>
        <p className="text-xs text-gray-500">Tác giả: {book.authors?.map(a => a.name).join(', ')}</p>
        <div className="flex items-baseline">
          <p className="text-tiki-red font-bold">{book.price}đ</p>
          {discount > 0 && (
            <p className="text-gray-500 line-through ml-2">{originalPrice}đ</p>
          )}
          {discount > 0 && <span className="text-red-500 text-xs ml-2">{discount}%</span>}
        </div>
        <p className="text-xs text-gray-600">Đã bán: {book.quantity_sold?.text}</p>
        <p className="text-xs text-yellow-600">★★★★★ {book.rating_average}</p>
        <button
          onClick={() =>
            addItem({
              id: book.id,
              title: book.name,
              price: book.price,
              quantity: 1,
            })
          }
          className="bg-tiki-red text-white px-2 py-1 rounded mt-2 w-full bg-red-700 transition"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}