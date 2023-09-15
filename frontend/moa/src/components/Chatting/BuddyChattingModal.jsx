import React from 'react';

import CloseButton from '../CloseButton';

function BuddyChattingModal(props) {
  return (
    <div>
      <CloseButton onClose={props.closeModal}/>
      <p>버디 1:1 채팅</p>
      <div>
        채팅 화면 Component
      </div>
    </div>
  );
}

export default BuddyChattingModal;