import React, { useState } from 'react';
import OpenChattingListItem from './OpenChattingListItem';
import OpenChattingEntrance from './OpenChattingEntrance';
import CreateOpenChatting from './CreateOpenChatting';

function OpenChattingList(props) {
  const [openChattings, setOpenChattings] = useState([
    { id: 1, title: '오픈채팅방1', description: '소개1', member_id: 1, participate: [1, 2, 3] },
    { id: 2, title: '오픈채팅방2', description: '소개2', member_id: 4, participate: [5, 6, 7] },
  ]);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <div>
      <h3>오픈 채팅 목록</h3>
      <div>
        <p>검색 input Component</p>
      </div>
      <div>
        <button onClick={openCreateModal}>오픈채팅방 생성</button>
      </div>

      {createModalOpen && <CreateOpenChatting onClose={closeCreateModal} />}

      {openChattings.map((openChatting, index) => {
        const { id, title, description, member_id, participate } = openChatting;

        return (
          <div key={index}>
            <OpenChattingListItem
              id={id}
              title={title}
              description={description}
              member_id={member_id}
              participate={participate}
            />
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default OpenChattingList;
