import React, { useEffect, useRef, useState } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import "./HeroSlide.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import apiConfig from "../../api/apiConfig";
import 'swiper/swiper.scss';
import Button, { OutlineButton } from "../button/button";
import { useNavigate } from "react-router";
import Modal, { ModalContent } from "../modal/Modal";

function HeroSlide(props) {

    SwiperCore.use([Autoplay]);

    const [movieItem, setMovieItem] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMovieItem(response.results);
            } catch (e) {
                console.log(e);
            }
        }
        getMovies();
    }, [])

    return (
        <div className="hero-slide">
            <Swiper
                module={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            >
                {
                    movieItem.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItem.map((item, i) => <TrailerModal key={i} item={item} />)
            }
        </div>
    );
}

const HeroSlideItem = props => {
    let navigation = useNavigate();
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalAction = async () => {
        const modal = document.querySelector((`#modal_${item.id}`));
        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;

            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigation('/movie/' + item.id)}>
                            watch now
                        </Button>
                        <OutlineButton onClick={setModalAction}>
                            watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal action={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;
