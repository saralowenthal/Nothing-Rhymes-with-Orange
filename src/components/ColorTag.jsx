import styles from '../styles/colorTag.module.css';
import { Link } from 'react-router-dom';

export default function colorTag({tag}) {
    return (
        <Link to={'/?q=' + tag} className={styles.tag}>
            {tag}
        </Link>
    );
}