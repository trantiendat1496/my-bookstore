'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Book } from '@/lib/types';

interface BookFilterProps {
  initialBooks?: Book[];
}

export default function BookFilter({ initialBooks }: BookFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isNow, setIsNow] = useState(searchParams.get('now') === 'true');
  const [isTopDeal, setIsTopDeal] = useState(searchParams.get('topDeal') === 'true');
  const [isFreeShip, setIsFreeShip] = useState(searchParams.get('freeShip') === 'true');
  const [minRating, setMinRating] = useState(searchParams.get('rating') || '4');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popular');
  const [books, setBooks] = useState<Book[]>(initialBooks || []);

  useEffect(() => {
    const fetchBooks = async () => {
      const url = new URL('http://localhost:8888/books');
      if (isNow) url.searchParams.append('now', 'true');
      if (isTopDeal) url.searchParams.append('topDeal', 'true');
      if (isFreeShip) url.searchParams.append('freeShip', 'true');
      if (minRating) url.searchParams.append('rating', minRating);
      if (sortBy) url.searchParams.append('sort', sortBy);

      const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
      const data = await response.json() || [];
      setBooks(data);
    };

    fetchBooks();
  }, [isNow, isTopDeal, isFreeShip, minRating, sortBy]);

  const updateFilter = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams);
    if (value === true || value) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  const handleNowChange = () => {
    const newValue = !isNow;
    setIsNow(newValue);
    updateFilter('now', newValue);
  };

  const handleTopDealChange = () => {
    const newValue = !isTopDeal;
    setIsTopDeal(newValue);
    updateFilter('topDeal', newValue);
  };

  const handleFreeShipChange = () => {
    const newValue = !isFreeShip;
    setIsFreeShip(newValue);
    updateFilter('freeShip', newValue);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinRating(e.target.value);
    updateFilter('rating', e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    updateFilter('sort', e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Filter Checkboxes */}
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isNow}
            onChange={handleNowChange}
            className="mr-2"
          />
          <span className="text-red-500 font-semibold">NOW Giá sốc trong 2h</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isTopDeal}
            onChange={handleTopDealChange}
            className="mr-2"
          />
          <span className="text-yellow-500 font-semibold">TOP DEAL Siêu rẻ</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isFreeShip}
            onChange={handleFreeShipChange}
            className="mr-2"
          />
          <span className="text-green-500 font-semibold">FREESHIP XTRA</span>
        </label>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Đánh giá từ</label>
          <select
            value={minRating}
            onChange={handleRatingChange}
            className="mt-1 block p-2 border rounded-lg"
          >
            <option value="0">Tất cả</option>
            <option value="4">4 sao</option>
            <option value="3">3 sao</option>
          </select>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sắp xếp</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="mt-1 block p-2 border rounded-lg"
          >
            <option value="popular">Phổ biến</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div>
    </div>
  );
}