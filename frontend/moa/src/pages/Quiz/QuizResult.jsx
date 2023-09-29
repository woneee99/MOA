import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../../styles/Quiz/QuizResult.module.css';

function QuizResult(props) {
  // const location = props.location;
  const location = useLocation();
  const { state } = location;

  // const correctAnswers = props.location.state?.correctAnswers || 0;

  return (
    <div>
      <img 
       src={process.env.PUBLIC_URL + '/assets/Quiz/resultBg.png'} 
       alt="결과화면"
       className={styles.resultBg} 
      />
      <div className={styles.quizResultContainer}>
        <p className={styles.resultTitle}>결과</p>
        <img 
          src={process.env.PUBLIC_URL + '/assets/Quiz/resultImg.png'} 
          alt="결과아이콘"
          className={styles.resultImg} 
        />
        <div className={styles.resultText}>
          <p>총 {state}문제를</p>
          <p>맞혔습니다</p>
        </div>

        <div className={styles.resultBtn}>
          <p>다른문제풀기</p>
          <p>돌아가기</p>
        </div>
      </div>

    </div>
  );
}

export default QuizResult;