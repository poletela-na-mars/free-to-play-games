import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../components';

import { ReactComponent as UpArrowIcon } from './../assets/img/up-arrow-icon.svg';

import styles from './../scss/App.module.scss';

export const MainLayout = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const scrollToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVisibleButton = () => {
    setShowScrollToTop(window.pageYOffset > 300)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton);

    return () => {
      window.removeEventListener('scroll', handleVisibleButton);
    }
  }, []);

  return (
      <>
        {showScrollToTop && <UpArrowIcon className={styles.scrollToTopButton} onClick={() => scrollToTopHandler()} />}
        <div className={styles.wrapper}>
          <Header />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </>
  );
};
