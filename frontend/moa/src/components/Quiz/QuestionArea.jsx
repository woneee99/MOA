import React, { useState, useEffect } from 'react';
import { quizApi } from '../../api/quizApi';
import { Link } from 'react-router-dom';

function QuestionArea(props) {
  const [quizData, setQuizData] = useState([]);
  const [currentQuizIndex, setCurrentQuizindex] = useState(0);
  const [voices, setVoices] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [showResultButton, setShowResultButton] = useState(false);

  // 정답 처리
  // const [userAnswer, setUserAnswer] = useState(''); 
  const [isCorrect, setIsCorrect] = useState(null); // 정답 여부 저장 
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    // 퀴즈 데이터 가져오기
    const fetchQuizData = async () => {
      try {
        const response = await quizApi.getWordQuiz(); 
        setQuizData(response.data.response); 
      } catch (error) {
        console.error('퀴즈 데이터 가져오는 중 에러 발생:', error);
      }
    };

    // 배열이 비어있을 때만 데이터를 가져오는 조건 
    if (quizData.length === 0 && !showResultButton) {
      fetchQuizData();
    }
  },[quizData, showResultButton]); // 퀴즈가 바뀔 때만

  // TTS 
  useEffect(() => {
    const setVoiceList = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = setVoiceList;
    }

    setVoiceList();
  }, []);


  const speech = (text) => {
    const lang = "ko-KR";
    let utterThis = new SpeechSynthesisUtterance(text);

    utterThis.lang = lang;
    utterThis.rate = 0.8;

    const korVoice = voices.find(
      (elem) => elem.lang === lang || elem.lang === lang.replace("-","_")
    );

    if (korVoice) {
      utterThis.voice = korVoice;
      window.speechSynthesis.speak(utterThis);
    } else {
      console.error("한국어 음성 데이터를 찾을 수 없습니다.")
    }
  };

  // 정답 확인 함수
  const checkAnswer = async (userAnswer) => {
    try {
      console.log('사용자 답:', userAnswer);
      const response = await quizApi.submitAnswer({
        quizId: currentQuiz.quizId,
        quizSubmitAnswer: userAnswer, 
      });

      console.log('서버응답:', response.data.response.quizAnswer);
      const isAnswerCorrect = response.data.response.isQuizCorrect;

      if (isAnswerCorrect){
        // 정답 처리
        setCorrectAnswers(correctAnswers + 1);
        console.log('정답입니다!');
      } else {
        // 오답 처리
        console.log('틀렸습니다!')
      }
      setIsCorrect(isAnswerCorrect);
    } catch (error) {
      console.error('정답 확인 중 에러 발생 :', error);
    }
  }

  // 한 문제씩 가져오는 함수
  const handleNextQuiz = () => {
    if (currentQuizIndex < quizData.length - 1) {
      setCurrentQuizindex(currentQuizIndex + 1);
      setIsListening(false); 
      setIsCorrect(null); // 다음 문제 넘어갈 때 정답 초기화 
    } else {
      // 현재 퀴즈가 마지막 퀴즈인 경우
      setShowResultButton(true);
    }
  }; 

  const currentQuiz = quizData[currentQuizIndex];

  // TTS 
  const toggleListening = () => {
    setIsListening(!isListening);

    if (!isListening) {
      speech(currentQuiz.quizQuestion);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  // 결과
  const handleShowResult = () => {
    console.log("결과를 보여줍니다", correctAnswers);
  }



  return (
    <div>
      {currentQuiz ? (
        <div>
          <h1>
            문제 {currentQuizIndex + 1} 번 
          </h1>
          {currentQuiz.quizCategoryId === 2 ? (
            <div>
              <p>다음 단어를 듣고 맞춰보세요</p>
              <button onClick={toggleListening}>
                {isListening ? "듣기 중지" : "듣기"}
              </button>
            </div>
          ) : (
            <div>
              <p>다음 단어의 뜻을 맞춰보세요</p>
              <h1>{currentQuiz.quizQuestion}</h1> 
            </div>
          )}
          <ul>
            {currentQuiz.quizAnswerList.map((answer,answerIndex) =>(
              <button 
                key = {answerIndex}
                onClick={() => {
                  // setUserAnswer(answer);
                  checkAnswer(answer); // 정답 확인
                }}
                disabled={isCorrect !== null}
              >
                {answer}
              </button>
            ))}
          </ul>
          {showResultButton ? (
            <button onClick={handleShowResult}>결과보기</button>
          ) : (
            <button onClick={handleNextQuiz} disabled={isCorrect === null}>다음</button>
          )}
        </div>
      ) : (
        <p>로딩중...</p>
      )}
    </div>
  );
}

export default QuestionArea;
