import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function KoreaTourCarousel({ mediaPlaceList, selectedPlace, changeCenterByCarousel }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      changeCenterByCarousel(next);
    },
  };
  const [slider, setSlider] = useState(null);
  //처음 화면이 랜더링 되었을때는 null 이라 캐러셀이 보이지 않음

  const smIndex = mediaPlaceList.indexOf(selectedPlace);

  const selectedPlaceList = selectedPlace ? mediaPlaceList : [];

  useEffect(() => {
    if (slider) {
      slider.slickGoTo(smIndex);
    }
    console.log(smIndex);
  }, [smIndex]);

  return (
    // <S.CarouselWholeContainer>
    <Slider {...settings} ref={setSlider}>
      {selectedPlaceList &&
        selectedPlaceList.map((mart) => (
          <div>
            <div>{mart.placeNm}</div>
            <div>{mart.addr}</div>
          </div>
          //   <SlideContent data={mart.id} handleRen={handleRen} />
          // <S.MartBox key={mart.id}>캐러셀 안에 content 작성</S.MartBox>
        ))}
      {/* {data.map((data) => {
          return <SlideContent data={data} handleRen={handleRen} />;
        })} //Slider 안에 들어가는 내용(콘텐츠) */}
    </Slider>
    // </S.CarouselWholeContainer>
  );
}

export default KoreaTourCarousel;
