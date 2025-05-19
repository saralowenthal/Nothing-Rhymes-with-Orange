import colorWheel from '../assets/colorWheel.jpg'
import styles from '../styles/about.module.css'; 
export default function About() {
    return (
      <div className={styles.container}>
        <h1>About Color Theory</h1>
  
        <img
            src={colorWheel}
            alt="Color Wheel"
            style={{ maxWidth: "300px", marginBottom: "1rem" }}
        />
  
        <p>
          Color theory is the study of how colors interact and how we perceive them. It's used by
          artists, designers, and developers to create harmony and visual interest.
        </p>
  
        <ul>
          <li><strong>Primary colors:</strong> Red, yellow, blue</li>
          <li><strong>Secondary colors:</strong> Green, orange, purple</li>
          <li><strong>Complementary:</strong> Opposites on the color wheel (like blue and orange)</li>
          <li><strong>Analogous:</strong> Colors next to each other on the wheel</li>
          <li><strong>Warm colors:</strong> Red, orange, yellow</li>
          <li><strong>Cool colors:</strong> Blue, green, purple</li>
        </ul>
  
        <p>
          And while nothing rhymes with orange... it definitely vibes with teal, navy, and magenta.
        </p>
      </div>
    )
  }
  