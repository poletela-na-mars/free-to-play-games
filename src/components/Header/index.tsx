import { Link } from 'react-router-dom';

import styles from './../../scss/components/Header.module.scss';

export const Header = () => {
  return (
      <div className={styles.container}>
        <Link to='/'>
          <h1>Free-To-Play Games</h1>
        </Link>
      </div>
  );
};
