import { Outlet } from 'react-router-dom';

import { Header } from '../components';

import styles from './../scss/App.module.scss';

export const MainLayout = () => {
  return (
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
  );
};
