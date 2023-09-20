import React from 'react';
import { useLocation } from 'react-router';

import BackButton from '../../components/BackButton';
import ChattingArea from '../../components/Chatting/ChattingArea';

function OpenChattingDetail(props) {
  const location = useLocation();
  const state = location.state;

  const title = state.title;
  const description = state.description;
  const participate = state.participate;

  return (
    <div>
      <BackButton />
      <div>
        <h3>{ title }</h3>
        <p>{ participate.length }</p>
      </div>
      <ChattingArea />
    </div>
  );
}

export default OpenChattingDetail;