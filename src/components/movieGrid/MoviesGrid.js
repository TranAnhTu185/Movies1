import React, {useCallback, useEffect, useState} from 'react';

import "./MoviesGrid.scss";
import {useNavigate, useParams} from "react-router";
import tmdbApi, {category, movieType, tvType} from "../../api/tmdbApi";
import MovieCard from "../movieCard/MovieCard";
import Button, {OutlineButton} from "../button/button";
import Input from "../input/Input";

function MoviesGrid(props) {

    const [items, setItem] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const {keyword} = useParams();
    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined){
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                        break;
                    default:
                        response = await tmdbApi.getTVList(tvType.popular, {params});
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, {params});
            }
            setItem(response.results);
            setTotalPage(response.total_pages);
        }
        getList();
    }, [props.category, keyword]);


    const loadMore = async () => {
        let response = null;
        if (keyword === undefined){
            const params = {
                page: page + 1
            };
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                    break;
                default:
                    response = await tmdbApi.getTVList(tvType.popular, {params});
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, {params});
        }
        setItem([...items,...response.results]);
        setPage(page + 1);
    }
    return (
        <div>
            <div className="section mb-1">
                <MovieSearch category={props.category} keyword={keyword}/>
            </div>
            <div className="movie-grid">
                {
                    items.map((item, id) => <MovieCard category={props.category} item={item} key={id}/>)
                }
            </div>
            <div>
                {
                    page <totalPage ? (
                        <div className="movie-grid__loadMore">
                            <OutlineButton
                                className="small"
                                onClick={loadMore}
                            >
                                Load more
                            </OutlineButton>
                        </div>
                    ) : ""
                }
            </div>
        </div>
    );
}

const MovieSearch = props => {

    const navigation = useNavigate();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
    const gotoSearch = useCallback(() => {
        if(keyword.trim().length > 0) {
                navigation(`/${category[props.category]}/search/${keyword}`);
        }

    }, [keyword, props.category, navigation]);

    useEffect(()=> {
        const enterEvent = (e) => {
            e.preventDefault();
            if(e.keyCode === 13) {
                gotoSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        }
    }, [keyword, gotoSearch]);
    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={gotoSearch}>Search</Button>
        </div>
    )
}

export default MoviesGrid;
