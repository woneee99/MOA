import React from 'react';
import styles from './ArticleModal.module.css';

function ArticleModal(props) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.container}>
        <div className={styles.wordTitle}>
          <div className={styles.wordKoreanTitle}>사단법인</div>
          <div className={styles.wordPronunciation}>[Sadan Bobin]</div>
          <button className={styles.scrap}>
            <img src="../../../assets/NewsArticle/scrap.png"></img>
          </button>
        </div>
        <div className={styles.wordTranslation}>
          incorporated associaton
        </div>
        <div className={styles.wordButton}>
          <button className={styles.chatGptButton}>
            GPT에게 <br/> 물어보기
          </button>
          <button className={styles.BuddyButton}>
            버디에게 <br/> 물어보기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleModal;