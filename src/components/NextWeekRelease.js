import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  StackedCarousel,
} from "react-stacked-center-carousel";
import "../assets/styles/Slide.css";
import { Slide } from "./Slide";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../api/apiConfig";
import { resetMovieList } from "../reducers/ticketReducer";

export const NextWeekRelease = () => {
  const ref = React.useRef(StackedCarousel);

  const dispatch = useDispatch();

  const getAllMovies = async () => {
    const allMovies = await getMovies();
    dispatch(resetMovieList(allMovies.data));
  };

  const upComingList = useSelector((state) =>
    state.ticket.movieList.filter((movie) => !movie.isShowing)
  );
  useEffect(() => {
    getAllMovies();
    setInterval(stuff, 5000);
  }, []);

  function stuff() {
    ref.current?.goNext();
  }

  return (
    <>
      <h2>"Unleash Your Cinematic Journey: Stream, Watch, Repeat!"</h2>
      <span>Reserve your ticket now!</span>
      <div className="carousel-banner">
        <h1 className="banner-text">Unlocking Next Week's Release!</h1>
      </div>
      <div className="card" style={{ height: "600px" }}>
        <div
          style={{ width: "100%", position: "relative", userSelect: "none" }}
        >
          <ResponsiveContainer
            carouselRef={ref}
            render={(width, carouselRef) => {
              return (
                <StackedCarousel
                  ref={carouselRef}
                  slideComponent={Slide}
                  slideWidth={300}
                  carouselWidth={width}
                  data={upComingList}
                  maxVisibleSlide={3}
                  disableSwipe={false}
                  transitionTime={450}
                />
              );
            }}
          />
        </div>
      </div>
    </>
  );
};
