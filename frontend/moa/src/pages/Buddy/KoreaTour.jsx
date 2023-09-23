import React, { useState } from "react";

import BackButton from "../../components/BackButton";
import KoreaTourSearch from "../../components/KoreaTourSearch";
import KoreaTourMap from "../../components/KoreaTourMap";
import KoreaTourSearchResult from "../../components/KoreaTourSearchResult";
import { koreaTourApi } from "../../api/KoreaTourApi";

function KoreaTour(props) {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mediaPlaceList, setmediaPlaceList] = useState([]);

  const handleSearchClick = () => {
    const type = "all";
    const mediaName = "nct";
    koreaTourApi.getMediaList(type, mediaName).then((response) => {
      setmediaPlaceList(response.data.response);
      console.log(response.data.response);
    });
    setShowSearchResults(true);
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
  };

  return (
    <div>
      <BackButton />
      <br />
      <h1>한국 둘러보기</h1>
      <hr />
      <div>
        <KoreaTourSearch />
        <button onClick={handleSearchClick}>검색</button>
      </div>
      <hr />
      {showSearchResults && (
        <div className="search-results-popup">
          <KoreaTourMap mediaPlaceList={mediaPlaceList} />
          <KoreaTourSearchResult />
          <button onClick={closeSearchResults}>닫기</button>
        </div>
      )}
    </div>
  );
}

export default KoreaTour;
