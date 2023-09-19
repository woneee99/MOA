import { axios } from './https';

export const diaryApi = {
  // 교환일기 전체 조회
  getDiaryList : () => axios.get('diary'),

  // 교환일기 상세 조회
  getDiaryDetail : (exchangeDiaryId) => axios.get(`diary/${exchangeDiaryId}`),

  // 교환일기 생성
  createDiary : (data) => axios.post('diary', data),

  // 교환일기 수정
  updateDiary : (exchangeDiaryId, data) => axios.put(`diary/${exchangeDiaryId}`, data),

  // 교환일기 삭제
  deleteDiary : (exchangeDiaryId) => axios.delete(`diary/${exchangeDiaryId}`),
}