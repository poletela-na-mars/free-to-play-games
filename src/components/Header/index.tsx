import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from '../../redux/store';

import { ReactComponent as GameControllerIcon } from './../../assets/img/game-controller-icon.svg';

import { setFilters } from '../../redux/filter/slice';

import styles from './../../scss/components/Header.module.scss';

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onHomeNavigateHandler = async () => {
    await dispatch(setFilters({
      platform: 0,
      genre: 0,
      sort: 0,
    }));

    navigate('/');
  };

  return (
      <div className={styles.container}>
        <span className={styles.header} onClick={() => onHomeNavigateHandler()}>
          <h1>Free-To-Play Games</h1>
          <GameControllerIcon />
        </span>
      </div>
  );
};
