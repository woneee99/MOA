import React, { useState, useEffect } from 'react';
import { quizApi } from '../../api/quizApi';

function QuestionArea(props) {
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    // 퀴즈 데이터 가져오기
    const fetchQuizData = async () => {
      try {
        const response = await quizApi.getWordQuiz(); // 퀴즈 데이터 가져오기 
        setQuizData(response.data.response); // 가져온 데이터 상태에 설정
        console.log(response.data.response);
      } catch (error) {
        console.error('퀴즈 데이터 가져오는 중 에러 발생:', error);
      }
    };

    fetchQuizData();
  },[]);


  return (
    <div>
      
        {quizData ? (

          quizData.map((quiz, index) => {
            return(
              <div key={index}>
                <h1>{quiz.quizQuestion}</h1>
              </div>
            )
          })
          // quizData.map((quiz, index)=>(
          //   <div key={index}>
          //     <h1>{quiz.quizQuestion}</h1>
          //     <ul>
          //       {quiz.quizAnswerList.map((answer, answerIndex) => (
          //         <li key={answerIndex}>{answer}</li>
          //       ))}
          //     </ul>
          //   </div>
          // ))

          
          // <div>
          //   <h1>{quizData}</h1>
          //     {quizData.map((answer, index) => {
          //       return (
          //         // <div key={index}>{answer.quizQuestion}</div>
          //         <div key={index}>{answer.quizAnswerList}</div>
          //         // <div key={index}>{answer.quizQuestion}</div>
          //       )
          //     })}
          // </div>
        ) : (
          <p>로딩 중...</p>
        )}
    </div>
  );
}

export default QuestionArea;