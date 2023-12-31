import React from "react";
import { useNavigate } from "react-router-dom";

function MainButton({ text, to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button onClick={handleClick}>{text}</button>
  );
};

export default MainButton;