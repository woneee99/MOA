import React from 'react';

import CloseButton from '../CloseButton';
import OpenChattingList from './OpenChattingList';

function OpenChattingModal(props) {
  return (
    <div>
      <CloseButton onClose={props.closeModal}/>
      <OpenChattingList />
    </div>
  );
}

export default OpenChattingModal;