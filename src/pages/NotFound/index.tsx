import styles from '../../scss/pages/NotFound.module.scss';
import error from '../../assets/img/error-banner.png';
import { useEffect } from 'react';

export const NotFound = () => {
  useEffect(() => {
    localStorage.setItem('timer', '0');
    localStorage.setItem('game', '{}');
  }, []);

  return (
      <div className={styles.root}>
        <h2>Nothing found</h2>
        <p>Check that the entered address is correct.</p>
        <img src={error} alt='Error' />
      </div>
  );
};
