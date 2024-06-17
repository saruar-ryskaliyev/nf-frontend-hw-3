import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex space-x-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 rounded-md border border-gray-300"
        placeholder="Search..."
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded-md">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
