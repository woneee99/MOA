import React from "react";
import ConfirmButton from "../components/ConfirmButton";
import BuddyInterest from "../components/Matching/BuddyInterest";
import BuddyGender from "../components/Matching/BuddyGender";
import LoadingMatching from "../components/Matching/LoadingMatching";
import SuccessMatching from "../components/Matching/SuccessMatching";

function Matching(){
  return(
    <>
      <div>매칭 페이지</div>
      {/* 외국인 or 유학생에 따라 페이지 다르게 해야함 */}
      {/* white-space: pre-line : 줄바꿈 \n 인식 */}
      <h3>반가워요
        멋진 한국인 친구,
        버디를 만나보세요</h3>
      <ConfirmButton text="시작하기" />

      <BuddyInterest />
      <BuddyGender />
      <LoadingMatching />
      <SuccessMatching />
    </>
  );
};

export default Matching;
