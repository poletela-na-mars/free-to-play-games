import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from '../../redux/store';
import { setFilters } from '../../redux/filter/slice';
import { setCurrentPage, setGames } from '../../redux/games/slice';
import { fetchGames } from '../../redux/games/asyncActions';

import { FilterState } from '../../types/redux/types';

import { ReactComponent as GameControllerIcon } from './../../assets/img/game-controller-icon.svg';

import styles from './../../scss/components/Header.module.scss';

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onHomeNavigateHandler = async () => {
    const params: FilterState = {
      platform: 0,
      genre: 0,
      sort: 0,
    };
    const zeroedCurrentPage = { currentPage: 0 };

    await dispatch(setFilters(params));
    await dispatch(setCurrentPage(zeroedCurrentPage.currentPage));
    await dispatch(setGames([]));
    await dispatch(fetchGames({
          ...params,
          ...zeroedCurrentPage
        })
    );

    navigate('/');
  };

  return (
      <header className={styles.container}>
        <span className={styles.header} onClick={() => onHomeNavigateHandler()}>
          <h1>Free-To-Play Games</h1>
          <GameControllerIcon />
        </span>
      </header>
  );
};
