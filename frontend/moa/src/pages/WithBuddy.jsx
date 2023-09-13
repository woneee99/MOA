import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import BackButton from '../components/BackButton';

function WithBuddy(props) {
  return (
    <div>
      <p>WithBuddy Page</p>
      <div>
        <Link to="/withbuddy/exchangediary">
          <button>교환일기</button>
        </Link>
        <Link to="/withbuddy/balancegame">
          <button>밸런스 게임</button>
        </Link>
        <Link to="/withbuddy/koreatour">
          <button>한국 둘러보기</button>
        </Link>

        <BackButton />
      </div>
    </div>
  );
}

export default WithBuddy;