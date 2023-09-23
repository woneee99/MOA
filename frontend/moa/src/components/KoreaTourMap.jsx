import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import KoreaTourCarousel from "./KoreaTourCarousel";

function KoreaTourMap({ mediaPlaceList }) {
  //   const mediaPlaceList = props.mediaPlaceList;
  //   console.log(mediaPlaceList);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const { kakao } = window;

  const handleMarkerClick = (e, place) => {
    setSelectedPlace(place);
  };

  return (
    <Map
      center={{ lat: 37.644825, lng: 127.681114 }}
      style={{ width: "800px", height: "600px" }}
      level={3}
    >
      {mediaPlaceList.map((place) => (
        // console.log(new kakao.maps.LatLng(place.latitude, place.longitude));
        <MapMarker
          key={place.id}
          position={{ lat: `${place.latitude}`, lng: `${place.longitude}` }}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            size: { width: 24, height: 35 },
          }}
          title={place.placeNm}
          onClick={(e) => handleMarkerClick(e, place)}
        />
      ))}
      <KoreaTourCarousel
        mediaPlaceList={mediaPlaceList}
        selectedPlace={selectedPlace}
        // handleModal={handleModal}
      />
    </Map>
  );
}

export default KoreaTourMap;
