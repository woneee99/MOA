import { learningApi } from '../../api/learningApi';
import React, { Fragment, useEffect, useState } from 'react';
import styles from './ArticleModal.module.css';

function ArticleModal(props) {
  const { word, onCloseModal, translatedWord } = props.modalProps;

  const [isWordScrap, setIsWordScrap] = useState(null);

  useEffect(() => {
    learningApi.getIsWordScrap(word)
      .then((response) => {
        if (response.data.response) {
          setIsWordScrap(true);
        }
        else {
          setIsWordScrap(false);
        }
      })
      .catch((error) => {
        console.log('단어 스크랩 여부 조회 오류', error);
      })
  }, [word])

  return (
    <Fragment>
      <div className={styles.modalBackground} onClick={onCloseModal}></div>
      <div className={styles.container}>
        <div className={styles.wordTitle}>
          <div className={styles.wordKoreanTitle}>{word}</div>
          {/* <div className={styles.wordPronunciation}>[]</div> */}
          {!isWordScrap &&
            <button className={styles.scrap}>
              <img src="../../../assets/NewsArticle/scrap.png"></img>
            </button>
          }
          {isWordScrap &&
            <button className={styles.scrap}>
              <img src="../../../assets/NewsArticle/scrap_complete.png"></img>
            </button>
          }
        </div>
        <div className={styles.wordTranslation}>
          {translatedWord}
        </div>
        <div className={styles.wordButton}>
          <button className={styles.chatGptButton}>
            GPT에게 <br /> 물어보기
          </button>
          <button className={styles.BuddyButton}>
            버디에게 <br /> 물어보기
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default ArticleModal;