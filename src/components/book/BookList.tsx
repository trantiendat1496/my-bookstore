'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Book } from '@/lib/types';
import BookCard from './BookCard';

interface BookListProps {
  initialBooks?: Book[];
}

export default function BookList({ initialBooks }: BookListProps) {
  const searchParams = useSearchParams();
  const [searchQuery] = useState(searchParams.get('search') || '');
  const [isNow] = useState(searchParams.get('now') === 'true');
  const [isTopDeal] = useState(searchParams.get('topDeal') === 'true');
  const [isFreeShip] = useState(searchParams.get('freeShip') === 'true');
  const [minRating] = useState(searchParams.get('rating') || '0');
  const [sortBy] = useState(searchParams.get('sort') || 'popular');
  const [books, setBooks] = useState<Book[]>(initialBooks || []);

  useEffect(() => {
    const fetchBooks = async () => {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/books`);
      if (searchQuery) url.searchParams.append('search', searchQuery);
      if (isNow) url.searchParams.append('now', 'true');
      if (isTopDeal) url.searchParams.append('topDeal', 'true');
      if (isFreeShip) url.searchParams.append('freeShip', 'true');
      if (minRating && minRating !== '0') url.searchParams.append('rating', minRating);
      if (sortBy) url.searchParams.append('sort', sortBy);

      const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      const formattedBooks = Array.isArray(data) ? data.map((book: any) => ({
        ...book,
        price: book.current_seller?.price || book.price,
      })) : [];
      setBooks(formattedBooks);
    };

    fetchBooks();
  }, [searchQuery, isNow, isTopDeal, isFreeShip, minRating, sortBy]);

  if (!books.length && !initialBooks) return <div className="text-center p-4">Đang tải...</div>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}