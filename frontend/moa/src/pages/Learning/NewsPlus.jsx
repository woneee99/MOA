import React from 'react';
import News from '../../styles/Learning/WordLearning.module.css';
import WordLogo from '../../components/Learning/WordLogo';
import RelatedNews from '../../components/Learning/RelatedNews';
import { useLocation  } from 'react-router-dom';


function WordLearning(props) {
  const location = useLocation();
  const word = {...location.state};

  return (
    <div >
        <WordLogo word={"뉴스"}/>
        <div className={News.textContainer}>
            <div className={News.newsAbout}>News About</div>
            <div className={News.word}>노르딕워킹</div>
        </div>
        <div className={News.line}></div>
        
        
        <RelatedNews word={word} />
    </div>
  );
}

export default WordLearning;