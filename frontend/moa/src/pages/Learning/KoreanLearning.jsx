import React from 'react';
import BackButton from '../../components/BackButton';

import KeywordItem from '../../components/Learning/KeywordItem';
import WordCloud from '../../components/Learning/WordCloud';
import PopularWords from '../../components/Learning/PopularWords';
import Logo from '../../components/Logo';
import News from '../../styles/news.css';
import Modify from '../../assets/news/modifyKeyword.png';
import { Link } from 'react-router-dom';

function KoreanLearning(props) {
  return (
    <div >
      <Logo />
      <div className='display'>
        <div className='font'> View words about...</div>
        <Link to="">
          <img src={Modify} alt="modify" style={{ width: '20px'}}/>
        </Link>
      </div>
      <KeywordItem />
      <hr />
      <div className='font'>Trending Words Now!</div>
      <WordCloud />
      <hr />
      <div className='font'>Most Popular Word</div>
      <PopularWords />
    </div>
  );
}

export default KoreanLearning;