import React from 'react';

import CloseButton from '../CloseButton';

function CreateOpenChatting(props) {
  return (
    <div>
      <CloseButton onClose={props.onClose} />
      <p>오픈채팅방 생성 Modal</p>
    </div>
  );
}

export default CreateOpenChatting;