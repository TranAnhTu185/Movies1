import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Movielist.scss';
import tmdbApi, { category } from "../../api/tmdbApi";
import { Swiper, SwiperSlide } from "swiper/react";
import apiConfig from "../../api/apiConfig";
import MovieCard from "../movieCard/MovieCard";



MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

function MovieList(props) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};
            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTVList(props.type, { params });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        }
        getList();
    }, []);

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    items.map((item, id) => (
                        <SwiperSlide key={id}>
                            <MovieCard item={item} category={props.category} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

export default MovieList;