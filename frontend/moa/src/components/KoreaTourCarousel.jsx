import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSlider from "./SimpleSlider";
import styled from "styled-components";
import styles from '../styles/KoreaTour/KoreaTourCarousel.module.css';

const Container = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 320px;
  z-index:10;

  background: #FFFFFF;
  border-radius: 40px 40px 0px 0px;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
`;

const ImageContainer = styled.div`
  margin: 0 16px;
`;

const Image = styled.img`
  width: 300px;
  height: 200px;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
}

`;

const imgUrl = require("./zero.jpg");

function KoreaTourCarousel({ mediaPlaceList, selectedPlace, changeCenterByCarousel }) {
  const settings = {
    dots: false,
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
      <div className={styles.header}>
        <div className={styles.headerTop}> 검색결과 </div>
      </div>
      <div  className={styles.main}>
      <StyledSlider {...settings} ref={setSlider}>
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
          selectedPlaceList.map((place) => (
            <div className={styles.placeContent}>
              <ImageContainer>
                <Image src={place.realImg} />
                  <div className={styles.content}>
                    <div className={styles.contentDetail}>{place.placeNm}</div>
                    <div className={styles.contentDetail}>{place.addr}</div>
                    <div className={styles.contentDetail}>{place.relatePlaceDc}</div>
                  </div>
              </ImageContainer>
            </div>
            //   <SlideContent data={mart.id} handleRen={handleRen} />
            // <S.MartBox key={mart.id}>캐러셀 안에 content 작성</S.MartBox>
          ))}
        </StyledSlider>
        </div>
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
