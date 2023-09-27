import { learningApi } from '../../api/learningApi';
import React, { Fragment, useEffect, useState } from 'react';
import styles from './ArticleModal.module.css';

function ArticleModal(props) {
  const { word, onCloseModal, translatedWord } = props.modalProps;

  const [isWordScrap, setIsWordScrap] = useState(null);

  // 스크랩 여부 조회
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

  // 스크랩 등록
  const createWordScrap = () => {
    const data = {
      wordName: word,
      wordMean: '테스트', // 나중에 파파고 번역한 거 값 넘겨주기
    }

    learningApi.createWordScrap(data)
      .then((response) => {
        console.log(response);
        setIsWordScrap(true);
      })
      .catch((error) => {
        console.log('단어 스크랩 등록 오류', error);
      })
  }

  // 스크랩 삭제
  const deleteWordScrap = () => {
    learningApi.deleteWordScrap(word)
      .then((response) => {
        console.log(response);
        setIsWordScrap(false);
      })
      .catch((error) => {
        console.error('단어 스크랩 삭제 오류', error);
      })
  }

  return (
    <Fragment>
      <div className={styles.modalBackground} onClick={onCloseModal}></div>
      <div className={styles.container}>
        <div className={styles.wordTitle}>
          <div className={styles.wordKoreanTitle}>{word}</div>
          {/* <div className={styles.wordPronunciation}>[]</div> */}
          {!isWordScrap &&
            <button className={styles.scrap}
              onClick={createWordScrap}>
              <img src="../../../assets/NewsArticle/scrap.png"></img>
            </button>
          }
          {isWordScrap &&
            <button className={styles.scrap}
              onClick={deleteWordScrap}>
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