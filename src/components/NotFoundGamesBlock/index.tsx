import styles from '../../scss/components/GamesList.module.scss'

export const NotFoundGamesBlock = () => {
  return (
      <div className={styles.notFoundBlock}>
        <h2>Unfortunately, there are no suitable games.</h2>
      </div>
  );
};
