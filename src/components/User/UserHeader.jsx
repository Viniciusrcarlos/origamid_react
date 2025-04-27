import React from 'react';
import UserHeaderNav from './UserHeaderNav';
import styles from './userHeader.module.css'
import { useLocation } from 'react-router-dom';

const UserHeader = () => {
    const [title, setTitle] = React.useState('');
    const location = useLocation();

    React.useEffect(() => {
        if ('/conta/estatisticas' === location.pathname) {
            setTitle('Estatísticas')
        } else if ('/conta' === location.pathname) {
            setTitle('Minha Conta')
        } else {
            setTitle('Poste Sua Foto')
        }
    }, [location])

    return (
        <header className={styles.header}>
            <h1 className='title'>{title}</h1>
            <UserHeaderNav />
        </header>
    )
}

export default UserHeader;