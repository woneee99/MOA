import { axios } from './https';

export const openChatApi = {
  // 오픈채팅방 전체 조회
  getOpenChatRoom : () => axios.get('open-chat'),
  
  // 오픈채팅방 상세 조회
  getOpenChatRoomDetail : (roomId) => axios.get(`open-chat/${roomId}`),

  // 오픈채팅방 생성
  createOpenChatRoom : (data) => axios.post('open-chat', data),

  // 오픈채팅방 참여
  participateOpenChatRoom : (data) => axios.post('open-chat/participate', data),

  // 오픈채팅방 탈퇴
  exitOpenChatRoom : () => axios.delete('open-chat/leave'),

  // 오픈채팅방 삭제
  deleteOpenChatRoom : () => axios.delete('open-chat'),
};