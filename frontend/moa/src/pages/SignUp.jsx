import React from 'react';
import BackButton from '../components/BackButton';

function SignUp(props) {
  return (
    <div>
      <p>SignUp Page</p>
      <div className='signUpContainer'>
        <div>
          <label htmlFor="password" className="inputTitle">나는</label>
          <input type="radio" id="" name=""/>외국인
          <input type="radio" id="" name=""/>한국인
        </div>

        <div className="inputForm">
          <label htmlFor="password" className="inputTitle">이름</label>
          <input type="text" id="" name=""/>
        </div>

        <div className="inputForm">
          <label htmlFor="password" className="inputTitle">출신국가</label>
          <input type="text" id="" name=""/>
        </div>

        <div className="inputForm">
          <label htmlFor="password" className="inputTitle">성별</label>
          <input type="radio" id="" name=""/>남자
          <input type="radio" id="" name=""/>여자
        </div>

        <div className="inputForm">
          <label htmlFor="password" className="inputTitle">이메일</label>
          <input type="text" id="" name=""/>
        </div>

        <button>인증번호 전송</button>

        <div className="inputForm">
          <label htmlFor="password" className="inputTitle">비밀번호</label>
          <input type="password" id="" name=""/>
        </div>


      </div>
      <BackButton />
    </div>
  );
}

export default SignUp;