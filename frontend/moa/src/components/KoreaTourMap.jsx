import React from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useState, useEffect, useRef } from "react";
import KoreaTourCarousel from "./KoreaTourCarousel";
import cafe from "./cafe2.png";
import playground from "./playground2.png";
import restaurant from "./restaurant5.png";
import stay from "./stay4.png";
import station from "./station.png";
import store from "./store.png";
import SimpleSlider from "./SimpleSlider";

function KoreaTourMap({ mediaPlaceList }) {
  const [selectedPlace, setSelectedPlace] = useState();
  const mapRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // 현재 선택된 마크가 존재하는지

  const { kakao } = window;

  // if (mediaPlaceList.length > 0) {
  //   setSelectedPlace(mediaPlaceList[0]);
  //   setIsOpen(true);
  // }

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
    if (mediaPlaceList.length > 0) {
      setSelectedPlace(mediaPlaceList[0]);
      setIsOpen(true);
    }
  }, [mediaPlaceList]);

  useEffect(() => {
    if (mapRef.current) {
      const newCenter = new kakao.maps.LatLng(selectedPlace.latitude, selectedPlace.longitude);
      mapRef.current.setCenter(newCenter);
    }
  }, [selectedPlace]);

  return (
    <>
      <Map
        center={{ lat: 37.644825, lng: 127.681114 }}
        style={{ width: "390px", height: "300px" }}
        level={3}
        ref={mapRef}
        draggable={true}
      >
        {mediaPlaceList.map((place) => (
          <>
            <MapMarker
              key={`${place.latitude}-${place.longitude}`}
              position={{ lat: `${place.latitude}`, lng: `${place.longitude}` }}
              image={{
                src:
                  place.placeTy === "cafe"
                    ? cafe
                    : place.placeTy === "playground"
                    ? playground
                    : place.placeTy === "restaurant"
                    ? restaurant
                    : place.placeTy === "stay"
                    ? stay
                    : place.placeTy === "station"
                    ? station
                    : place.placeTy === "store"
                    ? store
                    : "https://user-images.githubusercontent.com/91959791/169664489-10a08071-905f-4a44-9a14-ae065704ced5.png",
                size: { width: 35, height: 35 },
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
                  <div
                    className="customoverlay"
                    style={{
                      padding: "9px",
                      backgroundColor: "#fff",
                      color: "#000",
                      border: "2px solid green",
                      borderTopLeftRadius: "50% 100px",
                      borderTopRightRadius: "50% 100px",
                      borderBottomLeftRadius: "50% 100px",
                      borderBottomRightRadius: "50% 100px",
                    }}
                  >
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
          </>
        ))}

        <KoreaTourCarousel
          mediaPlaceList={mediaPlaceList}
          selectedPlace={selectedPlace}
          changeCenterByCarousel={changeCenterByCarousel}
          // handleModal={handleModal}
        />
      </Map>
      {/* <SimpleSlider></SimpleSlider> */}
    </>
  );
}

export default KoreaTourMap;
