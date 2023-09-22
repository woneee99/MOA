import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import ConfirmButton from "../components/ConfirmButton";
import BuddyInterest from "../components/Matching/BuddyInterest";
import BuddyGender from "../components/Matching/BuddyGender";
import LoadingMatching from "../components/Matching/LoadingMatching";
import SuccessMatching from "../components/Matching/SuccessMatching";
import KoreanBuddy from "../components/Matching/KoreanBuddy";

function Matching() {
  // const location = useLocation();
  // const foreigner = location.state.isForeigner;

  // console.log(foreigner);

  const [isForeigner, setIsForeigner] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);

  const steps = [
    <KoreanBuddy />,
    <BuddyInterest />,
    <BuddyGender />,
    <LoadingMatching />,
    <SuccessMatching />,
  ];

  useEffect(() => {
    // Your useEffect logic here
  }, []);

  return (
    <>
      
      <div>매칭 페이지</div>
      {/* Display the current step */}
      {isForeigner ? (
        <h3>반가워요 멋진 한국인 친구, 버디를 만나보세요</h3>
      ) : (
        <h3>한국을 좋아하는 외국인 친구의 버디가 되어보세요</h3>
      )}
      <ConfirmButton text="시작하기" onClick={() => !isForeigner? setCurrentStep(0):setCurrentStep(1)} />

      {/* Display the "Next" button if not on the last step */}
      {currentStep < steps.length - 1 && (
        <button onClick={() => setCurrentStep(currentStep + 1)}>다음 단계</button>
      )}
    </>
  );
}

export default Matching;
