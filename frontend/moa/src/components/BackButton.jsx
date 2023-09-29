import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../components/BackButton.module.css'

// const backButtonStyle = {
//   backgroundColor: 'transparent',
//   border: 'none',
//   fontSize: '24px',
//   fontWeight: '700',
// };

function BackButton({ text = '뒤로가기' }) {
  const navigate = useNavigate();

  return (
    <div className={styles.backButtonDiv}>
      <div>
        <button className={styles.leftArrow}
          onClick={() => navigate(-1)}>
          <img src='../../../assets/Logo/left2.png'></img>
        </button>
        <span className={styles.backButtonText}>{text}</span>
      </div>
    </div >
  );
}

export default BackButton;