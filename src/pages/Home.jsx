import { useState } from 'react';
import styles from '../styles/home.module.css'; 

export default function Home() {
    // storing value of the search input until the form is sibmitted 
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    }
    
    // search using the API
    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = async (event) => {
      event.preventDefault();
      console.log(`Searching for ${searchTerm}...`);

      // call the API
      let paletteUrl = "/colormagic/api/palette/search?q=" + searchTerm;
      const paletteResponse = await fetch(paletteUrl);
      if (!paletteResponse.ok) {
          alert("An error occurred while getting the palette.")
          throw new Error(`Response status: ${paletteResponse.status}`);
      }
      const paletteJson = await paletteResponse.json();
      
      // store the results
      setSearchResults(paletteJson);
    }

    // found online
    // const isDark = hex => parseInt(hex.replace('#', ''), 16) < 0x888888;
    
    return (
      <div>
        <h1>Search Color Palettes</h1>

        <form onSubmit={handleSearch}>
          <input type="text" value={searchTerm} onChange={handleChange} />
          <button type="submit">Search</button>
        </form>

        <div className={styles.results} >
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
  