import { GamesList, TopPanel } from '../../components';

import styles from './../../scss/App.module.scss';

export const Home = () => {
  return (
      <main className={styles.spaceFiller}>
        <TopPanel />
        <GamesList />
      </main>
  );
};
