import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'nuka-carousel';

import { AppDispatch } from '../../redux/store';
import { fetchGame } from '../../redux/game/asyncActions';
import { selectGame } from '../../redux/game/selectors';

import { convertDate } from '../../utils/dateConverter';
import { Status } from '../../assets/consts';

import { ErrorBlock, NotFoundGamesBlock, Skeleton } from '../../components';

import { ReactComponent as RightArrowIcon } from './../../assets/img/right-arrow-icon.svg';
import { ReactComponent as LeftArrowIcon } from './../../assets/img/left-arrow-icon.svg';

import styles from '../../scss/pages/Game.module.scss';

export const GamePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { game, status } = useSelector(selectGame);

  // const [shouldFetchData, setShouldFetchData] = useState(false);

  const getGame = async () => {
    await dispatch(fetchGame({
          id: id as string
        })
    );
  };

  useEffect(() => {
    getGame();
  }, [id]);

  const onBackButtonClickHandler = () => {
    navigate(-1);
  };

  // TODO - GameSkeleton style and rename GamesSkeleton
  const skeleton = [...new Array(8)].map((_, idx) => <Skeleton key={idx} />);

  return (
      <main className={styles.container}>
        {
          status === Status.ERROR
              ? <ErrorBlock />
              :
              status === Status.LOADING
                  ? skeleton
                  : (Object.keys(game).length ?
                          <div className={styles.root}>
                            <section className={styles.hero}>
                              <button className={styles.backButton} onClick={() => onBackButtonClickHandler()}>Back to
                                Games
                              </button>
                              <img className={styles.thumbnail} src={game.thumbnail} alt={game.title} />
                              <h2 className={styles.title}>{game.title}</h2>
                            </section>

                            <section className={styles.detailsBlock}>
                              <article className={styles.genre}>
                                <span>Genre</span>
                                <p>{game.genre}</p>
                              </article>
                              <article className={styles.releaseDate}>
                                <span>Release Date</span>
                                <p>{convertDate(game.release_date as string)}</p>
                              </article>
                              <article className={styles.developer}>
                                <span>Developer</span>
                                <p>{game.developer}</p>
                              </article>
                              <article className={styles.publisher}>
                                <span>Publisher</span>
                                <p>{game.publisher}</p>
                              </article>
                            </section>

                            <section className={styles.carousel}>
                              <p className={styles.screenshotLabel}>{game.title} Screenshots</p>
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
                                  game.screenshots!!.map((scr) =>
                                      <img key={scr.id} className={styles.screenshot} src={scr.image} alt={game.title} />
                                  )
                                }
                              </Carousel>
                            </section>

                            <section className={styles.requirements}>
                              <p className={styles.requirementsLabel}>Minimum System Requirements</p>
                              <ul className={styles.requirementsList}>
                                <li><span>OS</span><br />{game.minimum_system_requirements!!.os}</li>
                                <li><span>Memory</span><br />{game.minimum_system_requirements!!.memory}</li>
                                <li><span>Storage</span><br />{game.minimum_system_requirements!!.storage}</li>
                                <li><span>Processor</span><br />{game.minimum_system_requirements!!.processor}</li>
                                <li><span>Graphics</span><br />{game.minimum_system_requirements!!.graphics}</li>
                              </ul>
                            </section>

                          </div>
                          // TODO - NotFoundGameBlock
                          : <NotFoundGamesBlock />
                  )
        }
      </main>
  );
};
