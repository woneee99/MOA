import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '../../components/AppBar';
import styles from '../../styles/Quiz/Quiz.module.css'

function Quiz(props) {
  const [questions, setQuestions] = useState([]);

  // const makeWordQuiz = (() => {
  //   // 단어 퀴즈 질문을 생성하는 논리를 작성하세요.
  // });

  useEffect(() => {
    // useEffect 로직을 작성하세요.
  }, [])


  return (
    <div>
      <AppBar />
      <div className={styles.quizContainer}>
        <h1>일상 한국어 배우기</h1>
        <div>
          <Link to="/quiz/question-page">
            <button>퀴즈풀기</button>
          </Link>
          <Link to="/quiz/incorrect-note">
            <button>오답노트</button>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Quiz;
