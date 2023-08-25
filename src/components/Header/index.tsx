import { Link } from 'react-router-dom';

import { ReactComponent as GameControllerIcon } from './../../assets/img/game-controller-icon.svg';

import styles from './../../scss/components/Header.module.scss';

export const Header = () => {
  return (
      <div className={styles.container}>
        <Link to='/'>
          <div className={styles.header}>
            <h1>Free-To-Play Games</h1>
            <GameControllerIcon />
          </div>
        </Link>
      </div>
  );
};
