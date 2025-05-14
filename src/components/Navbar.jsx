import { Link } from 'react-router-dom'
// import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav>
      {/* className={styles.nav} */}
      <Link to="/">Home</Link>
      <Link to="/about">About Color Theory</Link>
    </nav>
  )
}
