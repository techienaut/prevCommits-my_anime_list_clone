import React, { useState, useEffect } from "react";
import "./GenreCarousel.css";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import useSlidesPerScroll from "../../helpers/useSlidesPerScroll";
import { animeGenreCodes, mangaGenreCodes } from "../../data/GenreData";

function GenreCarousel(props) {
  const [actionData, setActionData] = useState("");
  const [currPageNum, setCurrPageNum] = useState(1);
  const [carouselVal, setCarouselVal] = useState(0);
  const slidesPerScroll = useSlidesPerScroll();
  // useEffect(() => {
  //   setSlidesPerScroll(point);
  // }, [point]);
  useEffect(() => {
    const makeApiCall = async () => {
      let limit = 30;
      const url = `https://api.jikan.moe/v3/search/${props.type}?genre=${props.genre}&page=${currPageNum}&order_by=score&limit=${limit}`;
      const res = await fetch(url);
      const json = await res.json();
      console.log("json:", json);
      if (actionData) {
        setActionData(actionData.concat(json.results));
      } else {
        setActionData(json.results);
      }
    };
    makeApiCall();
  }, [currPageNum]);
  const renderAnimeItems = () => {
    let render = actionData.map(anime => {
      return (
        <div className="animeItem">
          <div style={{ minHeight: "110px", position: "relative" }}>
            <p
              style={{
                position: "absolute",
                bottom: 0,
                fontSize: "16px",
                lineHeight: 1.2,
                width: "90px",
                marginBottom: "6px"
              }}
            >
              {anime.title}
            </p>
          </div>
          <img style={{ height: "140px" }} src={anime.image_url} alt="" />
          <div style={{ minHeight: "110px" }}></div>
        </div>
      );
    });
    return render;
  };
  const onChange = value => {
    if (value >= actionData.length) {
      setCurrPageNum(currPageNum + 1);
    }
    setCarouselVal(value);
  };
  return (
    <div className="GenreCarousel" style={{ minHeight: "300px" }}>
      <h3
        className="carouselTitle"
        style={{ marginBottom: "0px", marginTop: "0px" }}
      >
        {animeGenreCodes[props.genre - 1]}
      </h3>
      <Carousel
        slidesPerScroll={slidesPerScroll}
        slidesPerPage={slidesPerScroll}
        value={carouselVal}
        onChange={onChange}
        infinite
        arrows
      >
        {actionData ? renderAnimeItems() : ""}
      </Carousel>
    </div>
  );
}
export default GenreCarousel;
