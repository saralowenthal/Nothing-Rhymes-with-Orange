import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from '../styles/details.module.css';
import { useNavigate } from 'react-router-dom';
import ColorSwatch from '../components/ColorSwatch';
import ColorTag from '../components/ColorTag';
import Loader from '../components/Loader';

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [palette, setPalette] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchPalette() {
      setIsLoading(true);
      setHasError(false);

      try {
        const response = await fetch(`/colormagic/api/palettes/${id}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setPalette(data);
      } catch (error) {
        console.error(error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPalette();
  }, [id]);

  if (isLoading) return <Loader/>;
  if (hasError) return <p>Error loading palette.</p>;
  if (!palette) return <p>No palette found.</p>;

  const formattedDate = new Date(palette.createdAt).toLocaleDateString();

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className={styles.container}>
      
      <span onClick={() => navigate(-1)} className={styles.backLink}>← Back</span>

      <h2 className={styles.heading}>{palette.text}</h2>

<<<<<<< HEAD
      <div className={styles.colorSwatches}>
        {palette.colors.map((color) => (
          <div
            key={color}
            className={styles.colorBox}
            style={{ backgroundColor: color }}
            onClick={() => handleCopy(color)}
            title="Click to copy HEX Value"
          >
            {color}
          </div>
        ))}
      </div>
=======
      <ColorSwatch colors={palette.colors} />
>>>>>>> 4fc3b52de0ed9d826990940c55f02ea7c7a863d7

      <div>
        <h4>Palette Themes:</h4>
        <div className={styles.tags}>
          {palette.tags.map((tag) => <ColorTag tag={tag} key={tag} />)}
        </div>
      </div>

      <div className={styles.meta}>
        <p><strong>Created on:</strong> {formattedDate}</p>
      </div>
    </div>
  );
}