import { Skeleton } from '../Skeleton';

import styles from './../../scss/components/GamesList.module.scss';

export const GamesList = () => {
  // const mappedProducts = products.map((product: Product) => <ItemBlock key={product.id} {...product} />);
  const skeletons = [...new Array(8)].map((_, idx) => <Skeleton key={idx} />);

  return (
      <div className={styles.root}>
        {
          skeletons
        }
      </div>
  );
};

