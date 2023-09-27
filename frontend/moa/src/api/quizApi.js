// import { nonAuthAxios } from "./nonAuthAxios";
import { authAxios } from './authAxios';

export const quizApi = {
  getWordQuiz: () => {
    return authAxios.get('/quiz/word');
  },
}