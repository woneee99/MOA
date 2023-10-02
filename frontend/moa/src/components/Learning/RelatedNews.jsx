import React, { useState, useEffect } from 'react';
import News from '../../styles/Learning/RelatedNews.module.css';
import { learningApi } from '../../api/learningApi';

function RelatedNews(props) {
  const { word } = props;
  console.log(word);



  useEffect(() => {
    console.log(word)
    learningApi.getRelatedNewsByWord(word)
      .then((response) => {
        const res = response;
        console.log("word: " + res)
      })
      .catch((error) => {
            console.error("API 요청 중 오류 발생:", error);
      });
  }, [word]);

  return (
    <div>
      <div className={News.newsContainer}>
        <div className={News.contentContainer}>
          <div className={News.NumberBox}>
            <div className={News.newsNumber}>1</div>
          </div>
          <div className={News.textContainer}>
            <div className={News.title}>남해 부는 '노르딕워킹' 바람, 심상치 않다 </div>
            <div className={News.content}>Southern part of the country is 'Nordic walking' wind, unusual</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelatedNews;