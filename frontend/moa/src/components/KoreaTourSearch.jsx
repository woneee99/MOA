import React , { useState, useEffect }from 'react';

function KoreaTourSearch(props) {

  const onChange = (event) => {
    props.setMediaName(event.target.value);
  }

  return (
    <div>
      <h3>검색</h3>
      <div>
        <label htmlFor="mediaName">검색어를 입력하세요</label>
        <input type="text" id="mediaName" onChange ={onChange} placeholder="K-DRAMA or K-POP"/>
      </div>
      {/* <div>
        <label htmlFor="mediaType">매체 분류</label>
        <input type="text" id="mediaType" />
      </div>
      <div>
        <label htmlFor="title">이름</label>
        <input type="text" id="title" />
      </div>
      <div>
        <label htmlFor="place">장소</label>
        <input type="text" id="place" />
      </div>
      <div>
        <label htmlFor="placeType">장소 분류</label>
        <input type="text" id="placeType" />
      </div> */}
    </div>
  );
}

export default KoreaTourSearch;