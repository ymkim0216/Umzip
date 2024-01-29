import { useState } from 'react';
import classes from './SearchBar.module.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.search}>
        <input
          type="text"
          placeholder="검색어 입력"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">검색</button>
      </form>
    </div>
  );
}

export default SearchBar;
