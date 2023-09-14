import React from 'react';
import { useLocation } from 'react-router-dom';

import BackButton from '../../components/BackButton';

function ExchangeDiaryDetail(props) {
  const location = useLocation();
  const diary = location.state.diary; // state에서 다이어리 데이터 받아오기

  const id = diary.id;
  const title = diary.title;
  const content = diary.content;
  const image = diary.image;
  const date = diary.date;
  const time = diary.time;

  return (
    <div>
      {id} 번 다이어리
      <div>
        {image}
      </div>
      <div>
        <div>
          <h2>제목 : {title}</h2>
        </div>
        <div>
          <h3>작성 시간 : {date} {time}</h3>
        </div>
        <div>
          <h5>내용 : {content}</h5>
        </div>
      </div>
      <hr />
      <BackButton />
    </div>
  );
}

export default ExchangeDiaryDetail;
