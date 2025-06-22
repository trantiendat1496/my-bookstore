import { create } from 'zustand';
import { Book } from '@/lib/types';

interface ProductState {
  products: Book[];
  addProduct: (product: Book) => void;
  updateProduct: (id: string, updatedProduct: Partial<Book>) => void;
  deleteProduct: (id: string) => void;
  searchProducts: (query: string) => Book[];
  getPaginatedProducts: (page: number, perPage: number) => Book[];
  totalPages: (perPage: number) => number;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, { ...product, id: Date.now().toString() }] })),
  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updatedProduct } : p
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
  searchProducts: (query) =>
    get().products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    ),
  getPaginatedProducts: (page, perPage) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return get().products.slice(start, end);
  },
  totalPages: (perPage) => Math.ceil(get().products.length / perPage),
  fetchProducts: async () => {
    try {
      const response = await fetch('http://localhost:8888/books');
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      set({ products: Array.isArray(data) ? data : [] });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ products: [] });
    }
  },
}));