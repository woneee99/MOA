import React from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useState, useEffect, useRef } from "react";
import KoreaTourCarousel from "./KoreaTourCarousel";

function KoreaTourMap({ mediaPlaceList }) {
  //   const mediaPlaceList = props.mediaPlaceList;
  //   console.log(mediaPlaceList);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // 현재 선택된 마크가 존재하는지

  const { kakao } = window;

  const handleMarkerClick = (e, place) => {
    setSelectedPlace(place);
    setIsOpen(true);
  };

  const changeCenterByCarousel = (smIndex) => {
    // let nextIndex = 0;
    // if (smIndex === mediaPlaceList.length - 1) {
    //   nextIndex = 0;
    // } else {
    //   nextIndex = smIndex + 1;
    // }
    setSelectedPlace(mediaPlaceList[smIndex]);
    // const newToggles = isMarkerClicked.map((toggle, i) => {
    //   if (i === nextIndex) {
    //     return true;
    //   } else {
    //     return isMarkerClicked[nextIndex] === false ? false : toggle;
    //   }
    // });
    // setIsMarkerClicked(newToggles);
  };

  useEffect(() => {
    if (mapRef.current) {
      const newCenter = new kakao.maps.LatLng(selectedPlace.latitude, selectedPlace.longitude);
      mapRef.current.setCenter(newCenter);
    }
  }, [selectedPlace]);

  return (
    <Map
      center={{ lat: 37.644825, lng: 127.681114 }}
      style={{ width: "800px", height: "600px" }}
      level={3}
      ref={mapRef}
    >
      {mediaPlaceList.map((place) => (
        // console.log(new kakao.maps.LatLng(place.latitude, place.longitude));
        <div>
          <MapMarker
            key={`${place.latitude}-${place.longitude}`}
            position={{ lat: `${place.latitude}`, lng: `${place.longitude}` }}
            image={{
              src: "https://user-images.githubusercontent.com/91959791/169664489-10a08071-905f-4a44-9a14-ae065704ced5.png",
              size: { width: 24, height: 35 },
              options: {
                offset: {
                  x: 10,
                  y: -10,
                },
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            }}
            title={place.placeNm}
            onClick={(e) => handleMarkerClick(e, place)}
          />
          {isOpen &&
            selectedPlace.id == place.id && ( // 현재 선택된 마크만 오버레이 보이게 설정
              <CustomOverlayMap
                position={{ lat: `${place.latitude}`, lng: `${place.longitude}` }}
                yAnchor={1}
              >
                <div className="customoverlay" style={{padding:"9px", backgroundColor:"#fff", color:"#000", border: "2px solid green",  borderRadius: "50%"}}>
                  {/* <a
                    href="https://map.kakao.com/link/map/11394059"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="title">{place.placeNm}</span>
                </a> */}
                {place.placeNm}
                </div>
              </CustomOverlayMap>
            )}
        </div>
      ))}
      <KoreaTourCarousel
        mediaPlaceList={mediaPlaceList}
        selectedPlace={selectedPlace}
        changeCenterByCarousel={changeCenterByCarousel}
        // handleModal={handleModal}
      />
    </Map>
  );
}

export default KoreaTourMap;
