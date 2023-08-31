import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'nuka-carousel';

import { AppDispatch } from '../../redux/store';
import { fetchGame } from '../../redux/game/asyncActions';
import { selectGame } from '../../redux/game/selectors';
import { setGame } from '../../redux/game/slice';

import { convertDate } from '../../utils/dateConverter';
import { isNullish } from '../../utils/objectChecker';
import { NO_REQUEST_TIME, Status } from '../../assets/consts';
import { FullGame, Game } from '../../types/redux/types';

import { ErrorBlock, Loader } from '../../components';

import { ReactComponent as RightArrowIcon } from './../../assets/img/right-arrow-icon.svg';
import { ReactComponent as LeftArrowIcon } from './../../assets/img/left-arrow-icon.svg';

import styles from '../../scss/pages/Game.module.scss';

export const GamePage = () => {
  const timerRef = useRef<NodeJS.Timer>();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { game, status } = useSelector(selectGame);

  const [seconds, setSeconds] = useState<number>(Number(localStorage.getItem('timer')) ?? 0);
  const [cachedGame, setCachedGame] = useState<Partial<FullGame>>(game);

  // const [shouldFetchData, setShouldFetchData] = useState(false);

  const getGame = async () => {
    if (seconds === NO_REQUEST_TIME || !localStorage.getItem('game')) {
      console.log('was fetch')
      dispatch(fetchGame({
            id: id as string
          })
      ).then((res) => {
        setCachedGame(res.payload as Partial<FullGame>);
        persistGame(res.payload as Partial<FullGame>);
        setSeconds(0);
        startTimer();
      });
    } else {
      setCachedGame(JSON.parse(localStorage.getItem('game')!));
      await dispatch(setGame(cachedGame as Game));
    }
  };

  const persistTimer = useCallback((time: number) => {
    localStorage.setItem('timer', String(time));
  }, []);

  const persistGame = useCallback((g: Partial<FullGame>) => {
    localStorage.setItem('game', JSON.stringify(g));
  }, []);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setSeconds((sec) => sec! + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    setSeconds(Number(localStorage.getItem('timer')) ?? 0);
    if (seconds !== NO_REQUEST_TIME) startTimer();

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (seconds === NO_REQUEST_TIME) {
      clearInterval(timerRef.current);
    }

    persistTimer(seconds!);
  }, [seconds]);

  useEffect(() => {
    getGame();
  }, [id]);

  const onBackButtonClickHandler = () => {
    navigate(-1);
  };

  return (
      <main className={styles.container}>
        {
          status === Status.ERROR
              ? <ErrorBlock
                  errorText={<p>Unfortunately, we can't show you this game.
                    <br />Check that the entered address is correct or try again later.</p>} />
              :
              status === Status.LOADING
                  ? <Loader />
                  : Object.keys(cachedGame).length &&
                  <div className={styles.root}>
                    <section className={styles.hero}>
                      <button className={styles.backButton} onClick={() => onBackButtonClickHandler()}>
                        Back to Games
                      </button>
                      <img className={styles.thumbnail} src={cachedGame.thumbnail} alt={cachedGame.title} />
                      <h2 className={styles.title}>{cachedGame.title}</h2>
                    </section>

                    <section className={styles.detailsBlock}>
                      <article className={styles.genre}>
                        <span>Genre</span>
                        <p>{cachedGame.genre}</p>
                      </article>
                      <article className={styles.releaseDate}>
                        <span>Release Date</span>
                        <p>{convertDate(cachedGame.release_date as string)}</p>
                      </article>
                      <article className={styles.developer}>
                        <span>Developer</span>
                        <p>{cachedGame.developer}</p>
                      </article>
                      <article className={styles.publisher}>
                        <span>Publisher</span>
                        <p>{cachedGame.publisher}</p>
                      </article>
                    </section>

                    {
                        (cachedGame.screenshots && cachedGame.screenshots.length !== 0) &&
                        <section className={styles.carousel}>
                          <p className={styles.screenshotLabel}>{cachedGame.title} Screenshots</p>
                          <Carousel
                              renderCenterLeftControls={({ previousSlide, currentSlide }) => (
                                  currentSlide !== 0 &&
                                  <LeftArrowIcon className={styles.arrow} onClick={previousSlide} />
                              )}
                              renderCenterRightControls={({ nextSlide, slideCount, currentSlide }) => (
                                  currentSlide !== slideCount - 1 &&
                                  <RightArrowIcon className={styles.arrow} onClick={nextSlide} />
                              )}
                          >
                            {
                              cachedGame.screenshots.map((scr) =>
                                  <img key={scr.id} className={styles.screenshot} src={scr.image}
                                       alt={cachedGame.title} />
                              )
                            }
                          </Carousel>
                        </section>
                    }

                    {
                        (cachedGame.minimum_system_requirements &&
                            Object.keys(cachedGame.minimum_system_requirements).length &&
                            !isNullish(cachedGame.minimum_system_requirements)) &&
                        <section className={styles.requirements}>
                          <p className={styles.requirementsLabel}>Minimum System Requirements</p>
                          <ul className={styles.requirementsList}>
                            <li><span>OS</span><br />{cachedGame.minimum_system_requirements.os}</li>
                            <li><span>Memory</span><br />{cachedGame.minimum_system_requirements.memory}</li>
                            <li><span>Storage</span><br />{cachedGame.minimum_system_requirements.storage}</li>
                            <li><span>Processor</span><br />{cachedGame.minimum_system_requirements.processor}</li>
                            <li><span>Graphics</span><br />{cachedGame.minimum_system_requirements.graphics}</li>
                          </ul>
                        </section>
                    }
                  </div>
        }
      </main>
  );
};
