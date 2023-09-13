import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Intro(props) {
  return (
    <div>
      <p>
        Intro Page
      </p>
      <div>
        <Link to="/login">
          <button>로그인</button>
        </Link>
        <Link to="/signup">
          <button>회원가입</button>
        </Link>
      </div>
      <hr />
      <div>
        <Link to="/">
          <button>메인페이지로 이동</button>
        </Link>
      </div>
    </div>
  );
}

export default Intro;