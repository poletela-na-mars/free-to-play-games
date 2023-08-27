import styles from '../../scss/pages/NotFound.module.scss';
import error from '../../assets/img/error-banner.png';

export const NotFound = () => {
  return (
      <div className={styles.root}>
        <h1>Nothing found</h1>
        <p>Check that the entered address is correct.</p>
        <img src={error} alt='Error' />
      </div>
  );
};
