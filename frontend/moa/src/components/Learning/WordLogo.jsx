import React from 'react';
import News from '../../styles/Learning/Word.module.css';

const logoStyle = {
    width: '50%',
};

function WordLogo(props) {
  const { word } = props;

  return (
    <div className={News.topContainer}>
        <div className={News.leftWrap}> {'<'} </div>
        <div className={News.rightWrap}> {word}보기</div>
    </div>
  );
}


export default WordLogo;