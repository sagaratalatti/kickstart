import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchLocationProps {
  onSelect: (lat: number, lng: number) => void;
}

export const SearchLocation: React.FC<SearchLocationProps> = ({ onSelect }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async () => {
    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ address: searchValue });
      
      if (result.results[0]?.geometry?.location) {
        const location = result.results[0].geometry.location;
        onSelect(location.lat(), location.lng());
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Search for a location..."
        className="form-input pl-10"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="absolute inset-y-0 right-0 px-4 flex items-center bg-purple-500 text-white rounded-r-xl hover:bg-purple-600 transition-colors"
      >
        Search
      </button>
    </div>
  );
};