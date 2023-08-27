import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { ErrorBlock, GameBlock, NotFoundGamesBlock, Skeleton } from '../index';

import { AppDispatch } from '../../redux/store';
import { selectFilter } from '../../redux/filter/selectors';
import { selectGames } from '../../redux/games/selectors';
import { setFilters } from '../../redux/filter/slice';
import { fetchGames } from '../../redux/games/asyncActions';

import styles from './../../scss/components/GamesList.module.scss';

import { Status } from '../../assets/consts';
import { Game } from '../../types/redux/types';

export const GamesList = () => {
  const { platform, genre, sort } = useSelector(selectFilter);
  const { games, status } = useSelector(selectGames);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMounted = useRef<boolean>(false);

  const getGames = () => {
    dispatch(fetchGames({
          platform,
          genre,
          sort
        })
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters({
        ...params
      }));
    }
  }, []);

  useEffect(() => {
    getGames();
  }, [platform, genre, sort]);

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

  const mappedGames = games.map((game: Game) => <GameBlock key={game.id} {...game} />);
  const skeletons = [...new Array(8)].map((_, idx) => <Skeleton key={idx} />);

  return (
      <div className={styles.root}>
        {
          status === Status.ERROR
              ? <ErrorBlock />
              :
              status === Status.LOADING
                  ? skeletons
                  : (mappedGames.length ? mappedGames : <NotFoundGamesBlock />)
        }
      </div>
  );
};

