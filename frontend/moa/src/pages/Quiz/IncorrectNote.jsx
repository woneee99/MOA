import React, {useState,useEffect} from 'react';
import { quizApi } from '../../api/quizApi';
import BackButton from '../../components/BackButton';
import MenuHeader from '../../components/MenuHeader';
// import IncorrectNoteList from '../../components/Quiz/IncorrectNoteList';

function IncorrectNote(props) {
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [myQuizCnt, setMyQuizCnt] = useState(1);

  useEffect(() => {
    const fetchWrongAnswerCount = async () => {
      try {
        const response = await quizApi.getWrongAnswerCount();
        const count = response.data.response.quizWrongCount;
        setWrongAnswerCount(count);
      } catch (error) {
        console.error('틀린 문제 수 가져오는 중 에러 발생:', error);
      }
    };

    fetchWrongAnswerCount();
  }, []);

  const handleMyQuiz = (e) => {
    const newQuiz = parseInt(e.target.value, 10);
    setMyQuizCnt(newQuiz);
  }
  
  const updateMyQuiz = async () => {
    try{
      const response = await quizApi.getRandomWrongAnswer({quizWrongCount: myQuizCnt});
      console.log('풀 문제 수', myQuizCnt);
      console.log('다시풀기', response.data);
    } catch(error){
      console.error('풀 문제 수 업데이트 중 에러 발생', error);
    }
  };

  return (
    <div>
      <p>내가 틀린 문제는</p>
      <p>{wrongAnswerCount}문제</p>
      <p>오늘 풀 문제는</p>
      <input
        type="number"
        value={myQuizCnt}
        onChange={handleMyQuiz} 
      />
      <button onClick={updateMyQuiz}>풀기</button>
      {/* <IncorrectNoteList /> */}
    </div>
  );
}

export default IncorrectNote;