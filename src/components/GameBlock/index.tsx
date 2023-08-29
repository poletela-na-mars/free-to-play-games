import { Link } from 'react-router-dom';
import React, { forwardRef } from 'react';

import { convertDate } from '../../utils/dateConverter';

import { GameInList } from '../../types/redux/types';

import styles from '../../scss/components/GameBlock.module.scss';

type GameBlockProps = GameInList & { lastEl: boolean } & { ref?: React.Ref<HTMLLIElement> };

export const GameBlock: React.ForwardRefExoticComponent<GameBlockProps> = forwardRef(
    ({ id, title, genre, release_date, publisher, thumbnail, lastEl }: GameBlockProps, ref) => {
      return (
          <article className={styles.gameBlockWrapper} ref={lastEl ? ref : null}>
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
                  <p>Released:&nbsp;{convertDate(release_date)}</p>
                  <p className={styles.ellipsisOverflow}>{publisher}</p>
                </div>
              </div>
            </div>
          </article>
      );
    });
