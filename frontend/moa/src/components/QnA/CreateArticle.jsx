import React,{useState} from "react";

function CreateArticle(){
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    // 입력 값 변할 때마다 제목 상태 업데이트
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    // 글 작성 버튼 클릭 시 제목과 내용 처리
    console.log("제목", title)
  }


  return(
    <>
      <h3>글 작성 페이지</h3>
      <div>
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div>
        <label>내용</label>
        <textarea rows="4" cols="50"></textarea>
      </div>
      <button onClick={handleSubmit}>글 작성 완료</button>

    </>
  );
};

export default CreateArticle;