import React, {useState,useEffect} from 'react';
import { quizApi } from '../../api/quizApi';
import BackButton from '../../components/BackButton';
// import IncorrectNoteList from '../../components/Quiz/IncorrectNoteList';

function IncorrectNote(props) {
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);

  useEffect(() => {
    // API를 사용하여 틀린 문제 수 가져오기
    const fetchWrongAnswerCount = async () => {
      try {
        const response = await quizApi.getWrongAnswerCount();
        const count = response.data.response.quizWrongCount;
        setWrongAnswerCount(count);
        console.log('틀린문제수:', response.data.response.quizWrongCount)
      } catch (error) {
        console.error('틀린 문제 수 가져오는 중 에러 발생:', error);
      }
    };

    // 컴포넌트가 마운트될 때 API 호출
    fetchWrongAnswerCount();
  }, []);
  
  return (
    <div>
      <BackButton />
      <h1>오답노트 목록</h1>
      <p>틀린 문제 수 {wrongAnswerCount}</p>
      {/* <IncorrectNoteList /> */}
    </div>
  );
}

export default IncorrectNote;