import React from "react";
import { useState, useEffect } from "react";
import ConfirmButton from "../components/ConfirmButton";
import BuddyInterest from "../components/Matching/BuddyInterest";
import BuddyGender from "../components/Matching/BuddyGender";
import LoadingMatching from "../components/Matching/LoadingMatching";
import SuccessMatching from "../components/Matching/SuccessMatching";
import KoreanBuddy from "../components/Matching/KoreanBuddy";
import { userApi } from '../api/userApi';

function Matching(){
  const [memberInfo, setMemberInfo] = useState(null);

  async function fetchMemberInfo() {
    try {
      const response= await userApi.getMemberInfo();

      if (response.data.success) {
        const memberInfo = response.data.response;
        setMemberInfo(memberInfo); // 회원 정보를 상태로 저장 
        console.log('회원 정보:', memberInfo);
      } else {
        console.error('API 오류:', response.data.error.message);
      }
    } catch(error){
      console.error('API Request Error:', error.message);
    }
  }

  useEffect(() => {
    fetchMemberInfo();
  },[]);
  
  return(
    <>
      <button onClick={fetchMemberInfo}>회원정보 조회</button>
      {/* 회원정보 조회 결과 나오는 부분 */}


      <div>매칭 페이지</div>
      {/* 외국인 or 유학생에 따라 페이지 다르게 해야함 - - 조건 */}
      {/* white-space: pre-line : 줄바꿈 \n 인식 */}
      <h3>(외국인)반가워요
        멋진 한국인 친구,
        버디를 만나보세요</h3>
      <h3>(한국인)한국을 좋아하는
        외국인 친구의
        버디가 되어보세요</h3>
      <ConfirmButton text="시작하기" />

      {/* 한국 버디일 경우 KoreanBuddy.jsx 추가*/}
      <KoreanBuddy />
      <BuddyInterest />
      <BuddyGender />
      <LoadingMatching />
      <SuccessMatching />
    </>
  );
};

export default Matching;