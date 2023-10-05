import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { setIsLoading } from '../../store/isLoading';
import { useAppDispatch } from '../../store';
import styles from '../../styles/Main/Main.module.css';


const linkStyle = {
  textDecoration: 'none', // 밑줄 제거
  color: 'inherit', // 링크 색상을 상위 요소에서 상속
};

const buttonContainerStyle = {
  marginTop: '150px',
};

const buttonStyle = {

};

const buddyHomeStyle = {
  padding: '30px',
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Background/buddy_background.png)
  `,
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지 중앙 정렬
};

const diaryButtonStyle = {
  background: 'linear-gradient(180deg, #FDE5FF 0%, #F9E1BD 100%)',
  borderRadius: '18px',
  margin: '40px auto',
  padding: '40px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
};

const buttonTitleStyle = {
  display: 'flex',
  color: '#284657',
  fontSize: '24px',
  fontWeight: '700',
};

const buttonContentStyle = {
  display: 'flex',
  textAlign: 'left',
  color: '#284657',
  fontSize: '18px',
  fontWeight: '700',
};

const balanceGameButtonStyle = {
  padding: '40px',
  background: 'linear-gradient(180deg, #FDE5FF 0%, #F9E1BD 100%)',
  borderRadius: '18px',
  margin: '40px auto',
  padding: '40px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
};

const koreaTourButtonStyle = {
  padding: '40px',
  background: 'linear-gradient(180deg, #FDE5FF 0%, #F9E1BD 100%)',
  borderRadius: '18px',
  margin: '40px auto',
  padding: '40px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
};

function BuddyHome(props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 페이지 이동 함수
  const navigateTo = (path) => {
      navigate(path); // 3초 후에 페이지 이동
  };

  return (
    <div>
      <div className={styles.cardContainer} onClick={() => navigateTo('/buddy/exchangediary')}>
        <img
          src={process.env.PUBLIC_URL + '/assets/Background/card3.png'}
          alt="교환일기 보기"
        />
        <div className={styles.textContainer}>
          <p className={styles.homeTitleFont}>버디와 교환일기</p>
          <p className={styles.homeSubFont}>
            오늘 하루 어떤 일이 있었나요?
            <br />
            버디와 일상을 기록하고 공유해요
          </p>
        </div>
      </div>

      <div className={styles.buddyCards}>
        <div className={styles.subBuddyContainer} onClick={() => navigateTo('/buddy/balancegame')}>
          <img
            src={process.env.PUBLIC_URL + '/assets/Background/card3-1.png'}
            alt="밸런스게임보기"
          />
          <div className={styles.subTextContainer}>
            <p className={styles.buddyTitleFont}>밸런스게임</p>
            <p className={styles.buddySubFont}>
              A vs B ?!
              <br />
              버디와 놀기
            </p>
          </div>
        </div>
        
        <div className={styles.subBuddyContainer} onClick={() => navigateTo('/buddy/koreatour')}>
          <img
            src={process.env.PUBLIC_URL + '/assets/Background/card3-2.png'}
            alt="한국여행보기"
          />
          <div className={styles.subTextContainer}>
            <p className={styles.buddyTitleFont}>한국여행</p>
            <p className={styles.buddySubFont}>
              내가 찾던
              <br />
              바로 그 장소
            </p>
          </div>
        </div>

      </div>

    </div>
    // <div style={buddyHomeStyle}>
    //   <div style={buttonContainerStyle}>


    //   <div onClick={() => navigateTo('/buddy/balancegame')}>
    //     <Link to="/buddy/balancegame" style={linkStyle}>
    //       <div className="balance-game-button" style={balanceGameButtonStyle}>
    //         <p style={buttonTitleStyle}>밸런스게임</p>
    //         <p style={buttonContentStyle}>설명</p>
    //       </div>
    //     </Link>
    //   </div>

    //   <div onClick={() => navigateTo('/buddy/balancegame')}>     
    //     <Link to="/buddy/koreatour" style={linkStyle}>
    //       <div className="korea-tour-button" style={koreaTourButtonStyle}>
    //         <p style={buttonTitleStyle}>랜선여행</p>
    //         <p style={buttonContentStyle}>설명</p>
    //       </div>
    //     </Link>
    //   </div>
    // </div>
  );
}

export default BuddyHome;