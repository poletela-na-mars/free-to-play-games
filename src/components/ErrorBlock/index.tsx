import error from '../../assets/img/error-banner.png';
import styles from '../../scss/components/ErrorBlock.module.scss';

type ErrorBlockProps = {
  errorText: JSX.Element;
}

export const ErrorBlock = ({ errorText }: ErrorBlockProps) => {
  return (
      <div className={styles.errorBlock}>
        <h2>Oops, the error has occurred</h2>
        {errorText}
        <img src={error} alt='Error' />
      </div>
  );
};
