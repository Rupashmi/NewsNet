import { useState } from 'react';

const categories = ['business', 'technology', 'sports', 'health'];

const CategoryTabs = ({ selected, onSelect, onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <div className="category-tabs-wrapper">
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`category-button ${selected === cat ? 'active' : ''}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="search-bar-wrapper">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search news..."
          className="search-input"
        />
      </div>
    </div>
  );
};

export default CategoryTabs;
