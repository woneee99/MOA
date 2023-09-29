import React, { useState } from 'react';
import { diaryApi } from '../../../api/diaryApi';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../components/BackButton';

function CreateExchangeDiary() {
  const [exchangeDiaryContent, setExchangeDiaryContent] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  const handleContentChange = (e) => {
    setExchangeDiaryContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // 이미지 파일 설정
  };

  const exchangeDiaryRequest = {
    exchangeDiaryContent: exchangeDiaryContent,
  };

  const createDiary = () => {
    const formData = new FormData();

    const jsonBlob = new Blob([JSON.stringify(exchangeDiaryRequest)], { type: "application/json" });

    formData.append('exchangeDiaryRequest', jsonBlob);

    if (imageFile) {
      formData.append('multipartFile', imageFile);
    }

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    diaryApi.createDiary(formData, { headers })
      .then((response) => {
        if (response.data.success) {
          alert('일기가 생성되었습니다!');
          navigate('/buddy/exchangediary');
        } else {
          console.log('교환일기 생성 실패:', response.data.error.message);
        }
      })
      .catch((error) => {
        console.error('교환일기 생성 에러 발생:', error);
      });
  };

  return (
    <div>
      <BackButton text='일기쓰기' />
      <h1>교환일기 작성</h1>
      <div>
        <label htmlFor="diaryImage">이미지 업로드</label>
        <input
          type="file"
          id="diaryImage"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div>
        <label htmlFor="diaryContent">설명</label>
        <input
          type="text"
          id="diaryContent"
          value={exchangeDiaryContent}
          onChange={handleContentChange}
        />
      </div>
      <hr />
      <button onClick={createDiary}>생성하기</button>
    </div>
  );
}

export default CreateExchangeDiary;
