'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import SearchBar from './SearchBar';
import StatusTag from './StatusTag';
import UserIcons from './UserIcons';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-md p-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Logo />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
      </div>
      <div className="flex items-center space-x-4">
        <UserIcons />
      </div>
        {/* <StatusTag /> */}
    </header>
  );
}