import { nonAuthAxios } from "./nonAuthAxios";

export const quizApi = {
  getWordQuiz: () => {
    return axios.get('/quiz/word');
  },
}