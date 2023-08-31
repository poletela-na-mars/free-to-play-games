import { GamesList, TopPanel } from '../../components';
import { useEffect } from 'react';

export const Home = () => {
  useEffect(() => {
    localStorage.setItem('timer', '0');
    localStorage.setItem('game', '');
  }, []);

  return (
      <main>
        <TopPanel />
        <GamesList />
      </main>
  );
};
