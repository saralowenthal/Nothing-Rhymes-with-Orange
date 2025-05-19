// Import React hooks and modules for routing and styling
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from '../styles/details.module.css';
import { useNavigate } from 'react-router-dom';
import ColorTag from '../components/ColorTag';
import Loader from '../components/Loader';
const isProd = import.meta.env.PROD;

export default function Details() {
  const navigate = useNavigate();

  // Get palette ID from URL
  const { id } = useParams();

  // State to store the palette data, loading status, and error state
  const [palette, setPalette] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [copiedColor, setCopiedColor] = useState(null); // NEW

  useEffect(() => {
    async function fetchPalette() {
      setIsLoading(true);
      setHasError(false);

      try {
        const base = isProd ? 'https://corsproxy.io/?https://colormagic.app/' : '/colormagic/';
        const response = await fetch(`${base}api/palettes/${id}`);
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

  if (isLoading) return <p>Loading...</p>;
  if (hasError) return <p>Error loading palette.</p>;
  if (!palette) return <p>No palette found.</p>;

  const formattedDate = new Date(palette.createdAt).toLocaleDateString();

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color); // NEW
    setTimeout(() => setCopiedColor(null), 1000); // Hide after 1 sec
  };

  return (
    <div className={styles.container}>
      
      <span onClick={() => navigate(-1)} className={styles.backLink}>← Back</span>

      <h2 className={styles.heading}>{palette.text}</h2>

      <div className={styles.colorSwatches}>
        {palette.colors.map((color) => (
          <div
            key={color}
            className={styles.colorBox}
            style={{ backgroundColor: color }}
            onClick={() => handleCopy(color)}
            title="Click to copy HEX Value"
          >
            {copiedColor === color ? 'Copied!' : color}
          </div>
        ))}
      </div>

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