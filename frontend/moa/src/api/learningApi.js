import { authAxios } from "./authAxios";
import { bigDataAxios } from "./bigDataAxios";
import { nonAuthAxios } from "./nonAuthAxios";

export const learningApi = {

    // 번역 호출
    translateText: (translatedText) => {
        const translateEndPoint = 'translation'

        const requestData = {
            translatedText: translatedText,
        };

        return nonAuthAxios.post(translateEndPoint, requestData);

    },

    // 스크랩 여부 확인
    getIsNewsScrap: (articleOriginId) => authAxios.get(`scrap/news/check/${articleOriginId}`),

    // 스크랩 등록
    createNewsScrap: (data) => authAxios.post('scrap/news', data),

    // 스크랩 삭제
    deleteNewsScrap: (articleId) => authAxios.delete(`scrap/news/delete?type=news&articleId=${articleId}`),

    // 뉴스 기사 조회
    getNews: (articleId) => bigDataAxios.get(`articles/${articleId}`)
}