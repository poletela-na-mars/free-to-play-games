import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { AppDispatch } from '../../redux/store';
import { selectFilter } from '../../redux/filter/selectors';
import { setGenre, setPlatform, setSort } from '../../redux/filter/slice';

import { ReactComponent as DownArrowIcon } from './../../assets/img/down-arrow-icon.svg';

import { CategoryType, genresList, platformsList, sortsList } from '../../assets/consts';

import styles from './../../scss/components/TopPanel.module.scss';

export const TopPanel = () => {
  const { platform, genre, sort } = useSelector(selectFilter);

  const [isPlatformPopupOpen, setIsPlatformPopupOpen] = useState(false);
  const [isGenrePopupOpen, setIsGenrePopupOpen] = useState(false);
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);

  const [activePlatform, setActivePlatform] = useState(0);
  const [activeGenre, setActiveGenre] = useState(0);
  const [activeSort, setActiveSort] = useState(0);

  const dispatch: AppDispatch = useDispatch();

  const resetPopups = () => {
    setIsPlatformPopupOpen(false);
    setIsGenrePopupOpen(false);
    setIsSortPopupOpen(false);
  };

  useEffect(() => {
    setActivePlatform(platform);
    setActiveGenre(genre);
    setActiveSort(sort);

    // close popups, if they were opened before navigating to '/'
    resetPopups();
  }, [genre, platform, sort]);

  const onDownArrowClickHandler = (type: number) => {
    resetPopups();

    switch (type) {
      case CategoryType.Platform:
        setIsPlatformPopupOpen(!isPlatformPopupOpen);
        break;
      case CategoryType.Genre:
        setIsGenrePopupOpen(!isGenrePopupOpen);
        break;
      case CategoryType.Sort:
        setIsSortPopupOpen(!isSortPopupOpen);
        break;
      default:
        break;
    }
  };

  const onListItemClickHandler = (type: number, idx: number) => {
    switch (type) {
      case CategoryType.Platform:
        setActivePlatform(idx);
        dispatch(setPlatform(idx));
        setIsPlatformPopupOpen(!isPlatformPopupOpen);
        break;
      case CategoryType.Genre:
        setActiveGenre(idx);
        dispatch(setGenre(idx));
        setIsGenrePopupOpen(!isGenrePopupOpen);
        break;
      case CategoryType.Sort:
        setActiveSort(idx);
        dispatch(setSort(idx));
        setIsSortPopupOpen(!isSortPopupOpen);
        break;
      default:
        break;
    }
  };

  return (
      <div className={styles.container}>
        <ul className={styles.labels}>
          <li className={styles.label}>
            <p className={styles.typeLabel}>
              Platform:&nbsp;&nbsp;
            </p>
            <div className={styles.block}>
              <div className={styles.activeTypeBlock}>
                <p className={styles.activeTypeLabel}
                   onClick={() => onDownArrowClickHandler(CategoryType.Platform)}>{platformsList[activePlatform]}</p>
                <DownArrowIcon onClick={() => onDownArrowClickHandler(CategoryType.Platform)} />
              </div>
              {
                  isPlatformPopupOpen &&
                  <ul className={styles.list}>
                    {
                      platformsList.map((el, idx) =>
                          <li key={idx} className={styles.listItem}
                              onClick={() => onListItemClickHandler(CategoryType.Platform, idx)}>
                            {el}
                          </li>)
                    }
                  </ul>
              }
            </div>
          </li>

          <li className={styles.label}>
            <p className={styles.typeLabel}>
              Genre/Tag:&nbsp;&nbsp;
            </p>
            <div className={styles.block}>
              <div className={styles.activeTypeBlock}>
                <p className={styles.activeTypeLabel}
                   onClick={() => onDownArrowClickHandler(CategoryType.Genre)}>{genresList[activeGenre]}</p>
                <DownArrowIcon onClick={() => onDownArrowClickHandler(CategoryType.Genre)} />
              </div>
              {
                  isGenrePopupOpen &&
                  <ul className={styles.list}>
                    {
                      genresList.map((el, idx) =>
                          <li key={idx} className={styles.listItem}
                              onClick={() => onListItemClickHandler(CategoryType.Genre, idx)}>
                            {el}
                          </li>)
                    }
                  </ul>
              }
            </div>
          </li>

          <li className={styles.label}>
            <p className={styles.typeLabel}>
              Sort&nbsp;By:&nbsp;&nbsp;
            </p>
            <div className={styles.block}>
              <div className={styles.activeTypeBlock}>
                <p className={styles.activeTypeLabel}
                   onClick={() => onDownArrowClickHandler(CategoryType.Sort)}>{sortsList[activeSort]}</p>
                <DownArrowIcon onClick={() => onDownArrowClickHandler(CategoryType.Sort)} />
              </div>
              {
                  isSortPopupOpen &&
                  <ul className={styles.list}>
                    {
                      sortsList.map((el, idx) =>
                          <li key={idx} className={styles.listItem}
                              onClick={() => onListItemClickHandler(CategoryType.Sort, idx)}>
                            {el}
                          </li>)
                    }
                  </ul>
              }
            </div>
          </li>
        </ul>
      </div>
  );
};
