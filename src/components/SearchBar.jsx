import styles from '../styles/searchBar.module.css';
import { useState } from 'react';

export default function SearchBar({isSearching, search, setHasSearched}) {
    // storing value of the search input until the form is sibmitted 
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchTerm.length) {
            search(searchTerm);
        }
    }
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        setHasSearched(false);
    }

    return (
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input type="text" value={searchTerm} onChange={handleChange} />
          <button type="submit" disabled={isSearching}>
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>
    );
}