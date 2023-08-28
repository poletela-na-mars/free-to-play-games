import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import qs from 'qs';

import { ErrorBlock, GameBlock, NotFoundGamesBlock, Skeleton } from '../index';

import { AppDispatch } from '../../redux/store';
import { selectFilter } from '../../redux/filter/selectors';
import { selectGames } from '../../redux/games/selectors';
import { setFilters } from '../../redux/filter/slice';
import { fetchGames } from '../../redux/games/asyncActions';
import { setCurrentPage, setGames } from '../../redux/games/slice';

import { Status } from '../../assets/consts';
import { Game } from '../../types/redux/types';

import styles from './../../scss/components/GamesList.module.scss';

export const GamesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMounted = useRef<boolean>(false);

  const { platform, genre, sort } = useSelector(selectFilter);
  const { games, status, currentPage } = useSelector(selectGames);

  const [shouldFetchData, setShouldFetchData] = useState(false);

  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const getGames = async () => {
    await dispatch(fetchGames({
          platform,
          genre,
          sort,
          currentPage
        })
    );
  };

  useEffect(() => {
    if (inView) {
      dispatch(setCurrentPage(currentPage + 1));
      setShouldFetchData(!shouldFetchData);
    }
  }, [inView]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters({
        ...params,
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

      dispatch(setCurrentPage(0));
      dispatch(setGames([]));
      setShouldFetchData(!shouldFetchData);
    }

    isMounted.current = true;
  }, [platform, genre, sort]);

  useEffect(() => {
    getGames();
  }, [shouldFetchData]);

  const mappedGames = games.map((game: Game, idx) => {
    const lastEl = idx === games.length - 1;
    return <GameBlock key={game.id} lastEl={lastEl} ref={ref} {...game} />
  });
  const skeletons = [...new Array(8)].map((_, idx) => <Skeleton key={idx} />);

  return (
      <div className={styles.root}>
        {
          status === Status.ERROR
              ? <ErrorBlock />
              :
              status === Status.LOADING && !mappedGames.length
                  ? skeletons
                  : (mappedGames.length ? mappedGames : <NotFoundGamesBlock />)
        }
      </div>
  );
};

