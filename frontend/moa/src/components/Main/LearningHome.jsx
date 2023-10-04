import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Main/Main.module.css';


// const buttonContainerStyle = {
//   // marginTop: '150px',
// };

// const learningHomeStyle = {
//   padding: '30px',
//   height: '100vh',
//   backgroundImage: `
//     url(${process.env.PUBLIC_URL}/assets/Background/news_background.png)
//   `,
//   backgroundSize: 'cover', // 배경 이미지 크기 조절
//   backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
//   backgroundPosition: 'center', // 배경 이미지 중앙 정렬
// };

// const newsButtonStyle = {
//   background: 'linear-gradient(180deg, #E9F6FF 17%, #8EB0E3 77%)',
//   borderRadius: '18px',
//   margin: '40px auto',
//   padding: '40px',
//   boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
// };

// const buttonTitleStyle = {
//   display: 'flex',
//   color: '#284657',
//   fontSize: '24px',
//   fontWeight: '700',
// };

// const buttonContentStyle = {
//   display: 'flex',
//   textAlign: 'left',
//   color: '#284657',
//   fontSize: '18px',
//   fontWeight: '700',
// };

// const collectionButtonStyle = {
//   padding: '40px',
//   background: 'linear-gradient(180deg, #E9F6FF 17%, #8EB0E3 77%)',
//   borderRadius: '18px',
//   margin: '40px auto',
//   padding: '40px',
//   boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
// };

function LearningHome(props) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/koreanlearning')
  }

  return (
    <div>
      <div onClick={handleClick}  className={styles.cardContainer}style={{ display: 'inline-block' }}>
        <img
          src={process.env.PUBLIC_URL + '/assets/Background/card1.png'}
          alt="뉴스보기"
        />
        <div className={styles.textContainer}>
          <p className={styles.homeTitleFont}>뉴스보기</p>
          <p className={styles.homeSubFont}>
            원하는 키워드 트렌드를 확인하고
            <br />
            그와 관련된 뉴스를 읽어보세요
          </p>
        </div>
      </div>


      <div className={styles.subCardContainer}>
        <img
          src={process.env.PUBLIC_URL + '/assets/Background/card1-1.png'}
          alt="뉴스보기"
        />
        <div className={styles.subTextContainer}>
          <p className={styles.homeTitleFont}>My Collection</p>
          <p className={styles.homeSubFont}>
            더 공부하고 싶은
            <br />
            단어와 뉴스 저장
          </p>
        </div>
      </div>

          {/* <div style={newsButtonStyle}> */}


        {/* </Link> */}
        {/* <div className="collection-button"> */}
        {/* <div className="collection-button" style={collectionButtonStyle}> */}
          {/* <p style={buttonTitleStyle}>Collection</p> */}
          {/* <p style={buttonContentStyle}>설명</p> */}
        {/* </div> */}
    </div>
  );
}

export default LearningHome;