import React from 'react';
import {useParams} from "react-router";
import PageHeader from "../components/pageHeader/PageHeader";
import { category as cate} from "../api/tmdbApi";
import MoviesGrid from "../components/movieGrid/MoviesGrid";

function Catalog() {
    const { category } = useParams();

    return (
        <div>
            <PageHeader>
                {
                    category === cate.movie ? 'Movies' :'TV series'
                }
            </PageHeader>
            <div className="container">
                <div className="section mb-1">
                    <MoviesGrid category={category}/>
                </div>
            </div>
        </div>
    );
}

export default Catalog;

