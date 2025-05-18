// Import the NavLink component from react-router-dom for navigation between routes
import { NavLink } from 'react-router-dom';
// Import CSS module styles
import styles from './Navbar.module.css';

// Define and export the Navbar functional component
export default function Navbar() {
  return (
    // Top-level navigation container with CSS module class
    <nav className={styles.nav}>
      
      {/* Logo or title of the application */}
      <div className={styles.logo}>
        <img src='orange.svg' alt="" />
        <span>Nothing Rhymes with Orange</span>
      </div>
      
      {/* Container for navigation links */}
      <div className={styles.links}>

        {/* NavLink automatically adds an "active" class when the route matches */}
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? styles.active : ''}
        >
          Home
        </NavLink>
        
        {/* Another NavLink for the About page */}
        <NavLink 
          to="/about" 
          className={({ isActive }) => isActive ? styles.active : ''}
        >
          About Color Theory
        </NavLink>
      </div>
    </nav>
  );
}
