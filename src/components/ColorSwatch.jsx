import styles from '../styles/colorSwatch.module.css';

export default function ColorSwatch({colors}) {
    return (
      <div className={styles.colorSwatch}>
        {colors.map((color) => (
          <div
            key={color}
            className={styles.colorBox}
            style={{ backgroundColor: color }}
          >
            {color}
          </div>
        ))}
      </div>
    );
}