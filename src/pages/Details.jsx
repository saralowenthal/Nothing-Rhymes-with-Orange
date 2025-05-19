import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Details() {
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
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

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

  return (
    <div>
      <h2>{palette.text}</h2>
      <div>
        {palette.colors.map((color) => (
          <div
            key={color}
          >
            {color}
          </div>
        ))}
      </div>
    </div>
  );
}
