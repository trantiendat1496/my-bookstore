import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8888',
});

export const fetchBooks = async (params: { search?: string }) => {
  const query = params.search ? `?search=${params.search}` : '';
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books${query}`);
  if (!response.ok) throw new Error('Failed to fetch books');
  const data = await response.json();
  return Array.isArray(data) ? data.map((book: any) => ({
    ...book,
    price: book.current_seller.price,
  })) : [];
};

export const fetchBookById = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`);
  if (!response.ok) throw new Error('Failed to fetch book');
  const data = await response.json();
  return { ...data, price: data.current_seller.price };
};

export default api;