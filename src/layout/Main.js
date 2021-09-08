import React, { useState, useEffect } from "react";
import Movies from "../components/Movies";
import Loader from "../components/Loader";
import Search from "../components/Search";

export default function Main (){
    const [movies, setMovies] = useState([]);
    const [loading, setLoadin] = useState(true);



   const searchMovies = (str, type = 'all') =>{
        setLoadin(true);
        fetch(`http://www.omdbapi.com/?apikey=329ffa13&s=${str}${type!=='all'? `&type=${type}` : ''}`)
            .then(response => response.json())
            .then((data) => {
                setLoadin(false);
                setMovies(data.Search);
            });
    };

    useEffect(()=>{
        fetch('http://www.omdbapi.com/?apikey=329ffa13&s=man')
            .then(response => response.json())
            .then(data => {
                setMovies(data.Search);
                setLoadin(false);
            });
    }, [])

        return (
            <div className="container content">
                <Search searchMovies={searchMovies} />
                {loading ? <Loader/> :  (<Movies movies={movies}/>)}
            </div>
        )
    }