import React from 'react';

import Card from '@/components/common/Card';
import styles from './page.module.scss';
import Navbar from '../components/Navbar';
export default function LandingPage() {
  return (
    <>
      {' '}
      <Navbar />
      <section>
        <div className={styles.landingContainer}>
          <div className={styles.wrapper}>
            <div className={styles.topic}>나만 갖고 있기엔</div>
            <br />
            <div className={styles.topic}>아까운 글이 있지 않나요?</div>
            <p />
            <div className={styles.writingPrompt}>
              다른 사람들과 감정을 공유해 보세요.
            </div>
          </div>
        </div>
      </section>
      <section className={styles.serviceIntro}>
        <div className={styles.wrapper}>
          <div className={styles.epigramVisualSet}>
            <div className={styles.tidbit}>
              <img src="/images/epigram-quote.png" alt="Daily Epigram" />

              <div className={styles.shareContainer}>
                <div className={styles.sharePrompt}>
                  <span>
                    명언이나 글귀, 토막 상식들을
                    <br />
                    공유해 보세요.
                  </span>
                </div>
                <div className={styles.spreadTreasuredWords}>
                  <span>
                    나만 알던 소중한 글들을
                    <br />
                    다른 사람들에게 전파하세요
                  </span>
                </div>
              </div>
            </div>
            <div></div>
            <div className={styles.epigramVisualSet}>
              <div className={styles.tidbit}>
                <div className={styles.horizontalCaption}>
                  <div className={styles.sharePrompt}>
                    <span>
                      감정, 상태에 따라,
                      <br />
                      알맞은 위로를 받을 수 있어요.
                    </span>
                  </div>
                  <div className={styles.spreadTreasuredWords}>
                    <span>태그를 통해 글을 모아 볼 수 있어요</span>
                  </div>
                </div>

                <img
                  src="/images/emotion-icons.png"
                  alt="Emotion Icons"
                  className={styles.emotionIcons}
                />
              </div>

              <div className={styles.epigramVisualSet}>
                <div className={styles.tidbit}>
                  <img
                    src="/images/emotion-chart.png"
                    alt="Daily Epigram"
                    className={styles.epigramQuote}
                  />

                  <div className={styles.shareContainer}>
                    <div className={styles.sharePrompt}>
                      <span>
                        내가 요즘 어떤 감정 상태인지
                        <br />
                        통계로 한눈에 볼 수 있어요.
                      </span>
                    </div>
                    <div className={styles.spreadTreasuredWords}>
                      <span>감정달력으로</span>
                      <br />
                      <span>내 마음에 담긴 감정을 확인해보세요.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.user}>
        <span>사용자들이 직접</span>
        <p />
        <span>인용한 에피그램들</span>
      </div>
      <div className={styles.userNameImage}>
        <img
          src="/images/user-quote-epigrams.png"
          alt="Daily Epigram"
          className={styles.userNameImage}
        />
      </div>
      <section className={styles.brandSection}>
        <img
          src="/images/daily-epigram-logo.png"
          alt="Daily Epigram"
          className={styles.brandlogo}
        />
      </section>
    </>
  );
}
