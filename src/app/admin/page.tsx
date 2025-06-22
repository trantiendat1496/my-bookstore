'use client';

import { useState, useEffect } from 'react';
import { useProductStore } from '@/store/products';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import ProductForm from './ProductForm';
import { Book } from '@/lib/types';

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Book> | null>(null);
  const { products, addProduct, updateProduct, deleteProduct, searchProducts, totalPages, fetchProducts } = useProductStore();
  const perPage = 5;
  const filteredProducts = searchProducts(searchQuery);
  const paginatedProducts = useProductStore.getState().getPaginatedProducts(currentPage, perPage);
  const totalPagesCount = totalPages(perPage);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa sách này?')) {
      deleteProduct(id);
    }
  };

  const handleEdit = (product: Book) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý Sách</h1>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Tìm kiếm sách..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-lg w-1/3"
        />
        <button
          onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}
          className="bg-green-500 text-white p-2 rounded-lg flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" /> Thêm mới
        </button>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Tên</th>
            <th className="p-2">Giá</th>
            <th className="p-2">Số lượng bán</th>
            <th className="p-2">Đánh giá</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="p-2">{product.id}</td>
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.price}đ</td>
              <td className="p-2">{product.quantity_sold?.text}</td>
              <td className="p-2">{product.rating_average}★</td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 p-2 rounded-lg disabled:opacity-50"
        >
          Trước
        </button>
        <span>
          Trang {currentPage} / {totalPagesCount}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPagesCount))}
          disabled={currentPage === totalPagesCount}
          className="bg-gray-300 p-2 rounded-lg disabled:opacity-50"
        >
          Sau
        </button>
      </div>
      {isFormOpen && (
        <ProductForm
          onClose={() => setIsFormOpen(false)}
          product={editingProduct}
          onSave={(product) => {
            if (editingProduct) {
              updateProduct(editingProduct.id, product);
            } else {
              addProduct(product);
            }
            setIsFormOpen(false);
          }}
        />
      )}
    </div>
  );
}