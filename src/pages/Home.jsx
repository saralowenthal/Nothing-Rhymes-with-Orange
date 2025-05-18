import { useState } from 'react';
import styles from '../styles/home.module.css'; 

export default function Home() {
    // storing value of the search input until the form is sibmitted 
    const [searchTerm, setSearchTerm] = useState('');
    
    const [hasSearched, setHasSearched] = useState(false); // new state
    const [isSearching, setIsSearching] = useState(false); // new state

    const handleChange = (event) => {
      setSearchTerm(event.target.value);
      setHasSearched(false);
    }
    
    // search using the API
    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = async (event) => {
      event.preventDefault();
      console.log(`Searching for ${searchTerm}...`);

      setIsSearching(true);

      // call the API
      let paletteUrl = "/colormagic/api/palette/search?q=" + searchTerm;
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

    // found online
    // const isDark = hex => parseInt(hex.replace('#', ''), 16) < 0x888888;
    
    return (
      <div className={styles.page}>
        <h1>Search Color Palettes</h1>

        <form onSubmit={handleSearch}>
          <input type="text" value={searchTerm} onChange={handleChange} />
          <button type="submit" disabled={isSearching}>
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>

        <div className={styles.results} >

          {hasSearched && searchResults.length === 0 && (
           <p className={styles.noResults}>No results found for "{searchTerm}".</p>        
          )}

          {searchResults.map(result => 
            <div className={styles.result} key={result.id}>
                <span className={styles.text}>{result.text}</span>
                {result.colors.map(color => 
                  <div className={styles.color} style={{backgroundColor: color}} key={color}>
                    <span>{color}</span>
                  </div>
                )}
            </div>
          )}
        </div>

      </div>
    )
  }
  