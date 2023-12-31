import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { openChatApi } from '../../api/chatApi';

import BackButton from '../../components/Buttons/BackButton';
import ChattingArea from '../../components/Chatting/ChattingArea';

const openChatRoomStyle = {
  height: '100vh',
  backgroundColor: 'white',
  // backgroundImage: `
  //   url(${process.env.PUBLIC_URL}/assets/Background/chatting_background.png)
  // `,
  // backgroundSize: 'cover', // 배경 이미지 크기 조절
  // backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  // backgroundPosition: 'center', // 배경 이미지 중앙 정렬
};

const titleBarStyle = {
  background: 'white',
  height: '121px',
  padding: '0 10px',
  display: 'flex',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};

const backButtonContainerStyle = {
  padding: '10px',
  marginTop: '60px'
}

const titleStyle = {
  marginRight: '10px',
  fontSize: '24px',
  fontWeight: '700',
  marginTop: '70px'
};

const memberCountStyle = {
  color: '#D9D9D9',
  fontSize: '24px',
  fontWeight: '700',
  marginTop: '70px'
};

function OpenChattingDetail(props) {
  const location = useLocation();
  const state = location.state;
  const openChatId = state.openChatId;

  const [title, setTitle] = useState('');
  const [memberCount, setMemberCount] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    openChatApi.getOpenChatRoomDetail(openChatId)
      .then((response) => {
        const res = response.data.response;
        setTitle(res.openChatTitle);
        setMemberCount(res.openChatMemberCount);
      })
  }, [openChatId]);

  // const deleteOpenChat = () => {
  //   openChatApi.deleteOpenChatRoom(openChatId)
  //   .then((response) => {
  //     alert('오픈채팅방이 삭제되었습니다');
  //     navigate('/chatting');
  //   })
  // };

  return (
    <div style={openChatRoomStyle}>
      <div style={titleBarStyle}>
        <div style={backButtonContainerStyle}>
          <BackButton text='←' />
        </div>
        <p style={titleStyle}>{title}</p>
        <p style={memberCountStyle}>{memberCount}</p>
        {/* <button onClick={deleteOpenChat}>오픈채팅방 삭제</button> */}
      </div>
      <ChattingArea
        openChatId={openChatId}
      />
    </div>
  );
}

export default OpenChattingDetail;