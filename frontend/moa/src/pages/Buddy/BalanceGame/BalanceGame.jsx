import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { balanceGameApi } from '../../../api/balanceGameApi';

import BackButton from '../../../components/BackButton';
import BalanceGameItem from '../../../components/BalanceGame/BalanceGameItem';
import PopularBalanceGameItem from '../../../components/PopularBalanceGameItem';

function BalanceGame(props) {
  const [balanceGames, setBalanceGames] = useState([]);
  const [popularBalanceGames, setPopularBalanceGames] = useState([]);

  useEffect(() => {
    balanceGameApi.getBalanceGameList()
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  })


  const navigate = useNavigate();

  const handleBalanceGameClick = (balanceGame) => {
    navigate(`/buddy/balancegame/${balanceGame.id}`, {
      state: { balanceGame }, // 밸런스게임 데이터를 state에 전달
    });
  };

  return (
    <div>
      <BackButton />
      <h2>밸런스 게임</h2>

      <div>
        <h3>인기 밸런스 게임</h3>
        {popularBalanceGames.map((popularBalanceGame, index) => {
          const rounds = popularBalanceGame.balanceGameList.length;
          return (
            <div key={index} onClick={() => handleBalanceGameClick(popularBalanceGame)}>
              <PopularBalanceGameItem 
                title={popularBalanceGame.title}
                username={popularBalanceGame.username}
                rounds={rounds}
              />
            </div>
          )
        })}
      </div>

      <br />
      <hr />
      <br />

      <div>
        <h3>밸런스 게임 목록</h3>
        <div>
          <Link to="/buddy/balancegame/create">
            <button>생성하기</button>
          </Link>
        </div>
        {balanceGames.map((balanceGame, index) => {
          const rounds = balanceGame.balanceGameList.length;
          return (
            <div key={index} onClick={() => handleBalanceGameClick(balanceGame)}>
              <BalanceGameItem 
                title={balanceGame.title}
                username={balanceGame.username}
                rounds={rounds}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default BalanceGame;