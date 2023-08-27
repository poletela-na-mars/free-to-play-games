import { Link } from 'react-router-dom';

import { Game } from '../../types/redux/types';

import styles from '../../scss/components/GameBlock.module.scss';

export const GameBlock = ({ id, title, genre, release_date, publisher, thumbnail }: Game) => {
  return (
      <article className={styles.gameBlockWrapper}>
        <div className={styles.gameBlock}>
          <Link to={`game/${id}`}>
            <img
                className={styles.gameBlockImg}
                src={thumbnail}
                alt={title}
            />
          </Link>
          <div className={styles.gameBlockTextInfo}>
            <div className={styles.gameBlockTitleWrapper}>
              <Link to={`game/${id}`}>
                <h3 className={`${styles.gameBlockTitle} ${styles.ellipsisOverflow}`}>{title}</h3>
              </Link>
            </div>
            <div className={styles.gameBlockDetails}>
              <p className={styles.ellipsisOverflow}>{genre}</p>
              <p className={styles.ellipsisOverflow}>Released:&nbsp;{release_date}</p>
              <p className={styles.ellipsisOverflow}>{publisher}</p>
            </div>
          </div>
        </div>
      </article>
  );
};
