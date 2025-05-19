import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from '../styles/home.module.css'; 
import PaletteCard from '../components/PaletteCard.jsx'; 
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
const isProd = import.meta.env.PROD;

export default function Home() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [hasSearched, setHasSearched] = useState(false); // new state
    const [isSearching, setIsSearching] = useState(false); // new state

    // Search using the navigation
    useEffect(() => {
      if (query) performSearch(query);
      else {
        // when clicks the home button, should start over
        setSearchResults([]);
        setHasSearched(false);
      }
    }, [query]);
    
    // search using the API
    const [searchResults, setSearchResults] = useState([]);
    const performSearch = async (searchTerm) => {
      console.log(`Searching for ${searchTerm}...`);

      setIsSearching(true);

      // call the API
      const base = isProd ? 'https://corsproxy.io/?https://colormagic.app/' : '/colormagic/';
      let paletteUrl = base + "api/palette/search?q=" + searchTerm;
      const paletteResponse = await fetch(paletteUrl);
      if (!paletteResponse.ok) {
          setIsSearching(false);
          alert("An error occurred while getting the palette.")
          throw new Error(`Response status: ${paletteResponse.status}`);
      }
      const paletteJson = await paletteResponse.json();
      
      // store the results
      setSearchResults(paletteJson);

      // mark that a search was done
      setHasSearched(true);
      setIsSearching(false);
    }
    
    return (
      <div className={styles.page}>
        <h1>Search Color Palettes</h1>

        <SearchBar isSearching={isSearching} setHasSearched={setHasSearched}/>

        <div className={styles.results} >

          {hasSearched && searchResults.length === 0 && (
           <p className={styles.noResults}>No results found.</p>        
          )}

          {isSearching ? <Loader/> : searchResults.map((result) => <PaletteCard result={result} key={result.id} /> )}
      </div>
    </div>
  );
}