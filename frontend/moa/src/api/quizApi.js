// import { nonAuthAxios } from "./nonAuthAxios";
import { authAxios } from './authAxios';

export const quizApi = {
  getWordQuiz: () => {
    return authAxios.get('/quiz/word');
  },

  // 정답 확인
  submitAnswer: (data) => {
    return authAxios.post('/quiz', data);
  },
};