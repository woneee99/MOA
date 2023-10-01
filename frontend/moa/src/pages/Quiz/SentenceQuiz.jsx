import { useState, useEffect } from "react";
import React from "react";
import { quizApi } from "../../api/quizApi";
// import { useNavigate } from "react-router-dom";
import MenuHeader from "../../components/MenuHeader";
import styles from '../../styles/Quiz/WordQuiz.module.css';
import Modal from 'react-bootstrap/Modal';

function SentenceQuiz(props) {
  const [sentenceData, setSentenceData] = useState([]);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [showResultButton, setShowResultButton] = useState(false);
  const currentSentence = sentenceData[sentenceIndex];

  const [voices, setVoices] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const [sentence, setSentence] = useState([]);
  
  const [answerMessage, setAnswerMessage] = useState('');
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers,setCorrectAnswers] = useState(0);



  useEffect(()=>{
    const fetchSentenceData = async () => {
      try {
        const response = await quizApi.getSentenceQuiz();
        setSentenceData(response.data.response);
        console.log(response.data.response);
      } catch(error){
        console.error('문장 퀴즈 가져오는 중 에러 발생', error);
      }
    };

    if (sentenceData.length === 0 && !showResultButton) {
      fetchSentenceData();
    }
  },[sentenceData, showResultButton]);
  
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

  // TTS 
  const toggleListening = () => {
    setIsListening(!isListening);

    if (!isListening) {
      speech(currentSentence.quizQuestion);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  // 정답 확인
  const checkAnswer = async (r) =>{
    const selecetedSentece = sentence.join(' ');
    
    if (selecetedSentece === currentSentence.quizAnswer) {
      setCorrectAnswers(correctAnswers + 1);
      setAnswerMessage('맞았어요!');
    } else {
      setAnswerMessage('틀렸어요!')
    }
    
    setShowAnswerModal(true);
    setTimeout(() => {
      setShowAnswerModal(false);
      handleNextQuiz();
    }, 1000);
    setSentence([]);
  }

  // 한 문제씩 가져오기
  const handleNextQuiz = () => {
    if (sentenceIndex < sentenceData.length -1) {
      setSentenceIndex(sentenceIndex + 1 );
      setIsListening(false);
      setIsCorrect(null);
    } else {
      setShowResultButton(true);
    }
  };
  
  

  return(
    <div>
      <MenuHeader title="문장퀴즈" />
      {currentSentence ? (
        <div>
          <h1>
            문제 {sentenceIndex + 1} 번
          </h1>
          {currentSentence.quizCategoryId === 4 ? (
            <div>
              <p className={styles.quizTitle}>다음을 듣고 문장을 완성해보세요</p>
              <div className={styles.questionContainer}>
                <div onClick={toggleListening}
                  className={styles.sentenceArea}>
                  <img src={process.env.PUBLIC_URL + '/assets/Quiz/quizSound.png'} 
                  alt="듣기" /> 
                </div>
                </div>
              </div>
          ) : (
            <div>
              <p className={styles.quizTitle}>다음 문장을 해석하고 완성해보세요</p>
              <div className={styles.questionContainer}>
                <div className={styles.sentenceArea}>
                  <p>{currentSentence.quizQuestion}</p>
                </div>
              </div>
            </div>           
          )}
          <div>
            <p>선택한 보기 목록</p>
            <p>{sentence.join(' ')}</p>
          </div>
          <button onClick={checkAnswer}>정답 확인</button>

          <ul>
            {currentSentence.quizAnswerList.map((answer, answerIndex) => (
              <button
                key={answerIndex}
                onClick={() => {
                  setSentence([...sentence, answer]);
              }}>
                {answer}
              </button>
            ))}
          </ul>

        </div>
      ) : (
        <p>로딩중...</p>
      )}
      <div>
        
      </div>

      <Modal show={showAnswerModal} >
        <Modal.Body>{answerMessage}</Modal.Body>
      </Modal>
    </div>
  );
}

export default SentenceQuiz;