import styles from '../styles/searchBar.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SearchBar({isSearching, setHasSearched}) {
    // initial value should be from the url
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    useEffect(() => { setSearchTerm(query); }, [query]);  // update the input whenever the url changes

    // storing value of the search input until the form is sibmitted 
    const [searchTerm, setSearchTerm] = useState(query);
    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchTerm.trim().length) {
            setSearchParams({ q: searchTerm.trim() }); // the home component looks out for this change
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