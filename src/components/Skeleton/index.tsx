import ContentLoader from 'react-content-loader';

import styles from './../../scss/components/Skeleton.module.scss';

export const Skeleton = () => (
    <ContentLoader
        className={styles.gameBlock}
        speed={2}
        viewBox='0 0 280 415'
        backgroundColor='#1B263B'
        foregroundColor='#415A77'
    >
      <rect x='0' y='0' rx='15' ry='15' width='280' height='240' />
      <rect x='0' y='255' rx='15' ry='15' width='280' height='37' />
      <rect x='0' y='305' rx='15' ry='15' width='280' height='27' />
      <rect x='0' y='345' rx='15' ry='15' width='280' height='27' />
      <rect x='0' y='385' rx='15' ry='15' width='280' height='27' />
    </ContentLoader>
);
