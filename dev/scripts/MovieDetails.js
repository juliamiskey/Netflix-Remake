import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class MovieDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            movie: {}
        }
    }
    componentDidMount() {
        axios({
            url: `https://api.themoviedb.org/3/movie/${this.props.match.params.movie_id}`,
            params: {
                _key: `4596c01cc129c0cbf8d2d1ac4cf4b6fe`,
                language: `en-US`,
                sort_by: `popularity.desc`
            }
        })
            .then((res) => {
                console.log(res.data)
                this.setState({
                    movie: res.data
                }
                );
            });
    }
    render() {
        return (
            <div className="wrapper">
                <div className='movie-single__poster'>
                    <div className='movie-single__description'>
                        <h2>{this.state.movie.original_title}</h2>
                        <h3>{this.state.movie.tagline}</h3>
                        <h4>{this.state.movie.vote_average} /10 Rating</h4> 
                        <h4>{this.state.movie.release_date}</h4> 
                        <p>{this.state.movie.overview}</p>
                        <a href="http://www.netflix.com" target="_blank"><i class="fas fa-play play"></i> PlAY</a>
                        {/* <button><i class="fas fa-plus fa-lg"></i> MY LIST</button> */}
                    </div>
                    <div className='movie-single__image'>
                        <img src={`http://image.tmdb.org/t/p/w500/${this.state.movie.backdrop_path}`} />
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieDetails