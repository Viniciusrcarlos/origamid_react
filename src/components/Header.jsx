import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Dog from '../Assets/dogs.svg';

const Header = () => {
  return (
    <div className={styles.Header}>
        <nav className='container'>
          <Link to="/"> 
            <Dog />
          </Link>
          <Link to="/login">Login / Criar</Link>
        </nav>
    </div>
  )
}

export default Header;