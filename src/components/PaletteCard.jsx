import { Link } from 'react-router-dom';
import styles from '../styles/paletteCard.module.css';

export default function PaletteCard({result}) {
    return (
        <Link to={`/palette/${result.id}`} className={styles.result}>
            <div className={styles.text}>
                {result.text}
            </div>

            {result.colors.map((color) => (
                <div
                    className={styles.color}
                    style={{ backgroundColor: color }}
                    key={color}
                >
                    <span>{color}</span>
                </div>
            ))}
        </Link>
    )
}