import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} >
      <div className="form-group">
        {/* <label htmlFor="">Buscar por título:</label> */}
        <input type="text" placeholder='Buscar Productos...' className="form-control" value={query} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-info">
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;