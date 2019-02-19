// URL: https://api.themoviedb.org/3/movie/550?api_key=4596c01cc129c0cbf8d2d1ac4cf4b6fe
// KEY: 4596c01cc129c0cbf8d2d1ac4cf4b6fe
// USERNAME: LiYingCodes
// PW:juliying
// DEVLINK: https://developers.themoviedb.org/3/discover/tv-discover

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Movies extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: []
        }
    }
    componentDidMount() {
        axios({
            url: `https://api.themoviedb.org/3/discover/movie`,
            params: {
                api_key: `4596c01cc129c0cbf8d2d1ac4cf4b6fe`,
                language: `en-US`,
                sort_by: `popularity.desc`,
            }
        })
            .then((res) => {
                this.setState({
                    movies: res.data.results
                });
            });
    }

    render() {
        return (
            <div className="wrapper">
                <h2>Browse Movies</h2>
               <div className='movie-catalogue'>
                    {this.state.movies.map((movie, i) => {
                        return (
                            <div key={movie.id} className='movie-catalogue__movie'>
                                <Link to={`/movie/${movie.id}`}>
                                    <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                                    {/* <i class="fas fa-plus icon"></i> */}
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <Link to="/next"> Next Page </Link>
                
            </div>
        )
    }
}

export default Movies