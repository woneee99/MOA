import React, { useState } from "react";

import AppBar from '../../components/AppBar';
import KoreaTourMap from "../../components/KoreaTourMap";
import KoreaTourSearchResult from "../../components/KoreaTourSearchResult";
import { koreaTourApi } from "../../api/KoreaTourApi";
import styles from '../../styles/KoreaTour/KoreaTourSearch.module.css';

function KoreaTour(props) {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mediaPlaceList, setmediaPlaceList] = useState([]);
  const [mediaName, setMediaName] = useState("");

  const onChange = (event) => {
    setMediaName(event.target.value);
  }

  const handleSearchClick = () => {
    const type = "all";
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
    <div className={styles.container}>
      <div className={styles.inner}>
        <AppBar></AppBar>
        <div className={styles.bg}>
        <div className={styles.searchContainer}>
          <div className={styles.searchContents}>
            <div className={styles.searchLabel}>
              <label htmlFor="mediaName">검색어를 입력하세요</label>
            </div>
            <div className={styles.searchArea}>
              <div className={styles.searchInput}>
                <span className={styles.vector}></span>
                <input className={styles.input} type="text" id="mediaName" onChange={onChange} placeholder="K-DRAMA or K-POP" />
              </div>
              <button className={styles.searchBtn} onClick={handleSearchClick}>검색하기</button>
            </div>
            </div>
            </div>
      </div>
      <hr />
      {showSearchResults && (
        <div className="search-results-popup">
          <KoreaTourMap mediaPlaceList={mediaPlaceList} />
          {/* <KoreaTourSearchResult /> */}
          <button onClick={closeSearchResults}>닫기</button>
        </div>
        )}
      </div>
    </div>
  );
}

export default KoreaTour;
