import { axios } from './https';

export const koreaTourApi = {
    // 컨텐츠 검색
    getMediaList : (type, mediaName) => axios.get(`media/search?type=${type}&mediaName=${mediaName}`),
  }