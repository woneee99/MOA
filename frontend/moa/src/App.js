import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import store from './store';
import Cookies from 'js-cookie';
// import { useAppDispatch, useAppSelector } from '../store';

import Intro from './pages/Intro';
import Main from './pages/Main';
import Login from './pages/Login';
import LoginLoading from './pages/LoginLoading';
import SignUp from './pages/SignUp';
import Matching from './pages/Matching';
import ChattingHome from './pages/Chatting/ChattingHome';
import BuddyChattingModal from './pages/Chatting/BuddyChattingModal';
import OpenChattingModal from './pages/Chatting/OpenChattingModal';
import OpenChattingDetail from './pages/Chatting/OpenChattingDetail';
import KoreanLearning from './pages/Learning/KoreanLearning';
import LearningKeyword from './pages/Learning/LearningMyKeyword';
import WordLearning from './pages/Learning/WordLearning';
import KoreanLearningDefault from './pages/Learning/KoreanLearningDefault';
import NewsPlus from './pages/Learning/NewsPlus';
import MyCollection from './pages/Learning/MyCollection';
import MyWord from './pages/Learning/MyWord';
import MyArticles from './pages/Learning/MyArticles';
// import QnABoard from './pages/QnA/QnABoard';
import Quiz from './pages/Quiz/Quiz';
import QuestionPage from './pages/Quiz/QuestionPage';
import SentenceQuiz from './pages/Quiz/SentenceQuiz';
import IncorrectNote from './pages/Quiz/IncorrectNote';
import IncorrectNoteList from './pages/Quiz/IncorrectNoteList';
import QuizResult from './pages/Quiz/QuizResult';
import ExchangeDiary from './pages/Buddy/Diary/ExchangeDiary';
import ExchangeDiaryDetail from './pages/Buddy/Diary/ExchangeDiaryDetail';
import CreateExchangeDiary from './pages/Buddy/Diary/CreateExchangeDiary';
import UpdateExchangeDiary from './pages/Buddy/Diary/UpdateExchangeDiary';
import BalanceGame from './pages/Buddy/BalanceGame/BalanceGame';
import BalanceGameDetail from './pages/Buddy/BalanceGame/BalanceGameDetail';
import CreateBalanceGame from './pages/Buddy/BalanceGame/CreateBalanceGame';
import UpdateBalanceGame from './pages/Buddy/BalanceGame/UpdateBalanceGame';
import KoreaTour from './pages/Buddy/KoreaTour/KoreaTour';
import KoreaTourResult from './pages/Buddy/KoreaTour/KoreaTourResult';
import NotFound404 from './pages/NotFound404';
import NewsArticle from './pages/Learning/NewsArticle';
import ExchangeDiaryContent from './pages/Buddy/Diary/ExchangeDiaryContent';

import { matchingApi } from './api/matchingApi' 

function App() {
  const state = store.getState();
  console.log(state);
  const accessToken = state.accessToken;
  var isMatching = state.isMatching;
  console.log(isMatching);
  const refreshToken = Cookies.get('refreshToken');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setIsLoading(true);
      // 3초 후에 isLoading 상태를 false로 설정
      setTimeout(() => setIsLoading(false), 3000);
    };

    startLoading();
  }, []);

  // 매칭관련
  const [isBuddyHave, setIsBuddyHave] = useState(null);
  useEffect(() => {
    matchingApi.isMatching()
    .then((response) => {
      console.log("api "+response.data.response);
      setIsBuddyHave(response.data.response);
    })
    .catch((error) => {
      console.error(error);
    })
  }, []);
  
  useEffect(() => {
    if (isBuddyHave != 0) {
      console.log("매칭이 true로 바뀜");
      isMatching = "true";
    }
}, [isBuddyHave]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {refreshToken ? ( // refreshToken이 있는 경우
            <>
              <Route path="/" element={<Main />} />

              <Route path="/matching" element={<Matching />} />

              <Route path="/chatting" element={<ChattingHome />} />
              <Route path="/chatting/buddy" element={isMatching != "false" ? <BuddyChattingModal /> : <Navigate to="/matching" />} />
              <Route path="/chatting/buddy2" element={<BuddyChattingModal />} />
              <Route path="/chatting/openchat" element={<OpenChattingModal />} />
              <Route path="/chatting/openchat/:id" element={<OpenChattingDetail />} />

              <Route path="/koreanlearning" element={<KoreanLearning />} />
              <Route path="/koreanlearning/word" element={<WordLearning />} />
              <Route path='/koreanlearning/word/news' element={<NewsPlus />} />
              <Route path='/koreanlearning/word/news/:articleId' element={<NewsArticle />} />
              <Route path='/koreanlearning/keyword' element={<LearningKeyword />} />
              <Route path='/koreanlearning/default' element={<KoreanLearningDefault />} />
              <Route path='/koreanlearning/collection' element={<MyCollection />} />
              <Route path='/koreanlearning/myWord' element={<MyWord />} />
              <Route path='/koreanlearning/myArticles' element={<MyArticles />} />

              <Route path="/quiz" element={<Quiz />} />
              <Route path="/quiz/question-page" element={<QuestionPage />} />
              <Route path="/quiz/sentence-quiz" element={<SentenceQuiz />} />
              <Route path="/quiz/incorrect-note" element={<IncorrectNote />} />
              <Route path="/quiz/incorrect-note-list" element={<IncorrectNoteList />} />
              <Route path="/quiz/quiz-result" element={<QuizResult />} />

              <Route path="/buddy/exchangediary" element={isMatching!=="false" ? <ExchangeDiary /> : <Navigate to="/matching" />} />
              <Route path="/buddy/exchangediary/:exchangeDiaryDate" element={<ExchangeDiaryDetail />} />
              <Route path="/buddy/exchangediary/content" element={<ExchangeDiaryContent />} />
              <Route path="/buddy/exchangediary/create" element={<CreateExchangeDiary />} />
              <Route path="/buddy/exchangediary/:id/update" element={<UpdateExchangeDiary />} />

              <Route path="/buddy/balancegame" element={isMatching!=="false" ? <BalanceGame /> : <Navigate to="/matching" />} />
              <Route path="/buddy/balancegame/:id" element={<BalanceGameDetail />} />
              <Route path="/buddy/balancegame/create" element={<CreateBalanceGame />} />
              <Route path="/buddy/balancegame/:id/update" element={<UpdateBalanceGame />} />

              <Route path="/buddy/koreatour" element={<KoreaTour />} />
              <Route path="/buddy/koreatour/:mediaPlace" element={<KoreaTourResult />} />

              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : ( // refreshToken이 없는 경우
            <>
              <Route path="/intro" element={<Intro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login-load" element={<LoginLoading />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/*" element={<Navigate to="/intro" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
