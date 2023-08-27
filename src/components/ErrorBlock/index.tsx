import styles from '../../scss/components/GamesList.module.scss';
import error from '../../assets/img/error-banner.png';

export const ErrorBlock = () => {
  return (
      <div className={styles.errorBlock}>
        <h2>Oops, the error has occurred</h2>
        <p>Unfortunately, the data could not be retrieved. Try again later.</p>
        <img src={error} alt='Error' />
      </div>
  );
};
