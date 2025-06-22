'use client';

import { useState } from 'react';
import { Book } from '@/lib/types';

interface ProductFormProps {
  onClose: () => void;
  product?: Partial<Book>;
  onSave: (product: Partial<Book>) => void;
}

export default function ProductForm({ onClose, product, onSave }: ProductFormProps) {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [description, setDescription] = useState(product?.description || '');
  const [imageUrl, setImageUrl] = useState(product?.images?.[0]?.thumbnail_url || '');
  const [quantitySold, setQuantitySold] = useState(product?.quantity_sold?.text || '');
  const [ratingAverage, setRatingAverage] = useState(product?.rating_average?.toString() || '');
  const [listPrice, setListPrice] = useState(product?.list_price?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    onSave({
      name,
      price: Number(price),
      description,
      images: [{ thumbnail_url: imageUrl }],
      quantity_sold: { text: quantitySold },
      rating_average: Number(ratingAverage),
      list_price: listPrice ? Number(listPrice) : undefined,
    });
    // Gửi lên API (chưa tích hợp, cần endpoint như /books)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {product ? 'Cập nhật sách' : 'Thêm sách mới'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên sách</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg"
              placeholder="Nhập tên sách"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Giá</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg"
              placeholder="Nhập giá"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg"
              placeholder="Nhập mô tả"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL ảnh</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg"
              placeholder="Nhập URL ảnh"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Số lượng bán</label>
            <input
              type="text"
              value={quantitySold}
              onChange={(e) => setQuantitySold(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg"
              placeholder="Nhập số lượng bán"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Đánh giá trung bình</label>
            <input
              type="number"
              value={ratingAverage}
              onChange={(e) => setRatingAverage(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg"
              placeholder="Nhập đánh giá"
              step="0.1"
              min="0"
              max="5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Giá gốc</label>
            <input
              type="number"
              value={listPrice}
              onChange={(e) => setListPrice(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg"
              placeholder="Nhập giá gốc"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 p-2 rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}