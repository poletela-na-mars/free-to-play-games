import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { Skeleton } from '../Skeleton';

import { AppDispatch } from '../../redux/store';
import { selectFilter } from '../../redux/filter/selectors';
import { selectGames } from '../../redux/games/selectors';
import { setFilters } from '../../redux/filter/slice';

import styles from './../../scss/components/GamesList.module.scss';
import { Status } from '../../assets/consts';

export const GamesList = () => {
  const { platform, genre, sort } = useSelector(selectFilter);
  const { games, status } = useSelector(selectGames);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters({
        ...params
      }));
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        platform,
        genre,
        sort,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [platform, genre, sort]);

  // const mappedProducts = products.map((product: Product) => <ItemBlock key={product.id} {...product} />);
  const skeletons = [...new Array(8)].map((_, idx) => <Skeleton key={idx} />);

  // TODO - style
  return (
      <div className={styles.root}>
        {
          status === Status.ERROR
              ? <div className='content__error-info'>
                <h2>Произошла ошибка</h2>
                <p>К сожалению, не удалось получить данные. Попробуйте повторить попытку позже.</p>
              </div>
              : <div className='content__items'>
                {
                  status === Status.LOADING
                      && skeletons
                      // : (mappedProducts.length ? mappedProducts : <NotFoundProductsBlock />)
                }
              </div>
        }
      </div>
  );
};

