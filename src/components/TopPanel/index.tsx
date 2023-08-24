import styles from './../../scss/components/TopPanel.module.scss';
import { platformsList } from '../../assets/consts';

export const TopPanel = () => {
  return (
      <div className={styles.container}>
        <ul className={styles.labels}>
          <li className={styles.label}>
            <p className={styles.typeLabel}>
              Platform:
            </p>
            <ul>
              {/*{platformsList.map((el) => )}*/}
            </ul>
          </li>

          <li className={styles.label}>
            <p className={styles.typeLabel}>
              Genre/Tag:
            </p>
          </li>

          <li className={styles.label}>
            <p className={styles.typeLabel}>
              Sort By:
            </p>
          </li>
        </ul>
      </div>
  );
};
