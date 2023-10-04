import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { quizApi } from '../../api/quizApi';

// import IncorrectNoteListItem from './IncorrectNoteListItem';

function IncorrectNoteList() {
  const location = useLocation();
  const { myQuizCnt } = location.state || {};
  
  useEffect(() => {
      const updateMyQuiz = async () => {
        try {
          const response = await quizApi.getRandomWrongAnswer({quizWrongCount: 10})
          // const response = await quizApi.getRandomWrongAnswer({quizWrongCount: myQuizCnt})
          console.log('다시 풀 문제:', response.data);
        } catch(error){
          console.error('풀 문제 수 업데이트 중 에러', error);
        }
      };

      updateMyQuiz();
    
  },[])
  // useEffect(() => {
  //   if (myQuizCnt !== undefined) {
  //     const updateMyQuiz = async () => {
  //       try {
  //         const response = await quizApi.getRandomWrongAnswer({quizWrongCount: 10})
  //         // const response = await quizApi.getRandomWrongAnswer({quizWrongCount: myQuizCnt})
  //         console.log('다시 풀 문제:', response.data);
  //       } catch(error){
  //         console.error('풀 문제 수 업데이트 중 에러', error);
  //       }
  //     };

  //     updateMyQuiz();
  //   }
  // },[myQuizCnt])
  return (
    <div>
      난녕
    </div>
  );
}

export default IncorrectNoteList;