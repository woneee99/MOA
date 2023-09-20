import React, { useState, useEffect } from 'react';

import OpenChattingEntrance from './OpenChattingEntrance';

const openChatItemStyle = {
  margin: '5px',
  padding: '5px',
  border: '1px solid black',
  borderRadius: '5px',
};

function OpenChattingListItem(props) {
  const { id, title, description, member_id, participate } = props;
  const [isEntranceOpen, setIsEntranceOpen] = useState(false);

  const openEntrance = () => {
    setIsEntranceOpen(true);
  }
  const closeEntrance = () => {
    setIsEntranceOpen(false);
  }

  return (
    <div style={openChatItemStyle}>
      <h4>{title}</h4>
      <p>{description}</p>
      <p>참여자 수: {participate.length}</p>

      <button onClick={openEntrance}>입장하기</button>

      {isEntranceOpen &&
        <OpenChattingEntrance 
          closeEntrance={closeEntrance}
          id={id}
          title={title}
          description={description}
          participate={participate}
        />
      }
    </div>
  );
}

export default OpenChattingListItem;