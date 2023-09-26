import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSlider from "./SimpleSlider";
import styled from 'styled-components';

const Container = styled.div`
  overflow:hidden;
`;

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
`;

const ImageContainer = styled.div`
  margin: 0 16px;
`;

const Image = styled.img`
max-width:100%;
max-height:100%;
`;

const imgUrl = require('./zero.jpg');

function KoreaTourCarousel({ mediaPlaceList, selectedPlace, changeCenterByCarousel }) {
  const settings = {
    dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: true,
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
<Container>
        <h2> Single Item</h2>
        <StyledSlider {...settings}
        >
          {/* {items.map(item => {
            return (
              <div key={item.id}>
                <ImageContainer>
                  <Image src={item.url} />
                </ImageContainer>
              </div>
            );
          })}
         */}
        {selectedPlaceList &&
        selectedPlaceList.map((mart) => (
          
          <div>
            <ImageContainer>
              <Image src={imgUrl} />
              <div>{mart.placeNm}</div>
            <div>{mart.addr}</div>
                </ImageContainer>
          </div>
          //   <SlideContent data={mart.id} handleRen={handleRen} />
          // <S.MartBox key={mart.id}>캐러셀 안에 content 작성</S.MartBox>
        ))}
        </StyledSlider>
      </Container>


    // <Slider {...settings} ref={setSlider}>
    //   {selectedPlaceList &&
    //     selectedPlaceList.map((mart) => (
    //       <div>
    //         <div>{mart.placeNm}</div>
    //         <div>{mart.addr}</div>
    //       </div>
    //       //   <SlideContent data={mart.id} handleRen={handleRen} />
    //       // <S.MartBox key={mart.id}>캐러셀 안에 content 작성</S.MartBox>
    //     ))}
    //   {/* {data.map((data) => {
    //       return <SlideContent data={data} handleRen={handleRen} />;
    //     })} //Slider 안에 들어가는 내용(콘텐츠) */}
    // </Slider>
  );
}

export default KoreaTourCarousel;
