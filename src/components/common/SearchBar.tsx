interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery, handleSearch }: SearchBarProps) {
  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="100% hàng thật"
        className="p-2 border rounded-l-lg focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
      >
        Tìm kiếm
      </button>
    </form>
  );
}