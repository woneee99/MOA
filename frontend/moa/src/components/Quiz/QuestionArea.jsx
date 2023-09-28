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
  const [userAnswer, setUserAnswer] = useState(''); // 사용자 답 저장
  const [isCorrect, setIsCorrect] = useState(null); // 정답 여부 저장 


  useEffect(() => {
    // 퀴즈 데이터 가져오기
    const fetchQuizData = async () => {
      try {
        const response = await quizApi.getWordQuiz(); // 퀴즈 데이터 가져오기 
        setQuizData(response.data.response); // 가져온 데이터 상태에 설정
        // console.log('퀴즈 데이터',response.data.response);
      } catch (error) {
        console.error('퀴즈 데이터 가져오는 중 에러 발생:', error);
      }
    };

    // 배열이 비어있을 때만 데이터를 가져오는 조건 
    if (quizData.length === 0 && !showResultButton) {
      fetchQuizData();
    }
  },[quizData, showResultButton]); // 퀴즈가 바뀔 때만 useEffect 발생 

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

  // 한 문제씩 가져오는 함수
  const handleNextQuiz = () => {
    if (currentQuizIndex < quizData.length - 1) {
      setCurrentQuizindex(currentQuizIndex + 1);
      setIsListening(false); // 다음 퀴즈 이동 시 듣기 비활성화 
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
      // 듣기 모드일 때 퀴즈 읽기
      speech(currentQuiz.quizQuestion);
    } else {
      // 듣기 모드 해제 시 읽기 중지
      window.speechSynthesis.cancel();
    }
  };

  // 결과보기 버튼
  const handleShowResult = () => {
    console.log("결과를 보여줍니다")
  }

  // 정답 확인 함수
  const checkAnswer = async () => {
    try {
      const response = await quizApi.submitAnswer({
        quizId: currentQuiz.quizId,
        quizSubmitAnswer: userAnswer, // 사용자 답 저장 
      });

      const isAnswerCorrect = response.data.response.isQuizCorrect;
      setIsCorrect(isAnswerCorrect);

      if (isAnswerCorrect){
        // 정답 처리
        console.log('정답입니다!');
      } else {
        // 오답 처리
        console.log('틀렸습니다!')
      }
    } catch (error) {
      console.error('정답 확인 중 에러 발생 :', error);
    }
  }

  return (
    <div>
      {currentQuiz ? (
        <div>
          <h1>
            문제 {currentQuizIndex + 1} 번 
          </h1>
          {currentQuiz.quizCategoryId === 2 ? (
            <button onClick={toggleListening}>
              {isListening ? "듣기 중지" : "듣기"}
            </button>
          ) : (
            <h1>{currentQuiz.quizQuestion}</h1> 
          )}
          <ul>
            {currentQuiz.quizAnswerList.map((answer,answerIndex) =>(
              <button 
                key = {answerIndex}
                onClick={() => {
                  setUserAnswer(answer);
                  checkAnswer(); // 정답 확인 함수 호출 
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
