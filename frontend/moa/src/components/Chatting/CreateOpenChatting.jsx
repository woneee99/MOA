import React, { useState, useEffect } from 'react';
import { openChatApi } from '../../api/chatApi';

import CloseButton from '../CloseButton';

const createOpenChatStyle = {
  position: 'fixed',
  top: 0,
  right: '-100%',
  bottom: 0,
  width: '100%',
  backgroundColor: 'white',
  transition: 'right 0.3s ease-in-out',
  zIndex: 999,
};

const modalOpenStyle = {
  right: 0,
};

function CreateOpenChatting(props) {
  const modalStyle = props.isOpen ? { ...createOpenChatStyle, ...modalOpenStyle } : createOpenChatStyle;

  const [openChatTitle, setOpenChatTitle] = useState('');
  const [openChatContent, setOpenChatContent] = useState('');
  const [imageFile, setImageFile] = useState('');

  const [formData, setFormData] = useState({});

  const handleTitleChange = (e) => {
    setOpenChatTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setOpenChatContent(e.target.value);
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const createOpenChatRoom = () => {
    const saveOpenChatRequest = {
      memberId: 1,
      openChatTitle: openChatTitle,
      openChatContent: openChatContent,
    };
  
    const formData = new FormData();
    formData.append('saveOpenChatRequest', JSON.stringify(saveOpenChatRequest));
    formData.append('multipartFile', imageFile);
  
    openChatApi.createOpenChatRoom(formData)
      .then((response) => {
        const openChatId = response.data.response;
        alert('오픈채팅방이 생성되었습니다!');
      })
      .catch((error) => {
        console.log('오픈채팅방 생성 에러 발생');
        console.log(error);
      });
  }
  
  console.log(formData);

  return (
    <div style={modalStyle}>
      <CloseButton onClose={props.onClose} />
      <h3>오픈채팅방 생성</h3>

      <div>
        <label htmlFor="openChatImage">이미지 업로드</label>
        <input
          type="file"
          id="openChatImage"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div>
        <label htmlFor="openChatTitle">제목</label>
        <input
          type="text"
          id="openChatTitle"
          value={openChatTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor="openChatContent">설명</label>
        <input
          type="text"
          id="openChatContent"
          value={openChatContent}
          onChange={handleContentChange}
        />
      </div>

      <button onClick={createOpenChatRoom}>생성하기</button>
    </div>
  );
}

export default CreateOpenChatting;
