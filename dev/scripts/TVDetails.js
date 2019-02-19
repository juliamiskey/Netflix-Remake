import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class TVDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            tv: {}
        }
    }
    componentDidMount() {
        axios({
            url: `https://api.themoviedb.org/3/tv/${this.props.match.params.tv_id}`,
            params: {
                api_key: `4596c01cc129c0cbf8d2d1ac4cf4b6fe`,
                language: `en-US`,
                sort_by: `popularity.desc`
            }
        })
            .then((res) => {
                console.log(res.data)
                this.setState({
                    tv: res.data
                }
                );
            });
    }
    render() {
        return (
            <div className="wrapper">
                <div className='movie-single__poster'>
                    <div className='movie-single__description'>
                        <h2>{this.state.tv.name}</h2>
                        <h4>{this.state.tv.vote_average}/10 Rating</h4>
                        <h4>{this.state.tv.first_air_date}</h4>
                        <p>{this.state.tv.overview}</p>
                        <a href="http://www.netflix.com" target="_blank"><i class="fas fa-play play"></i> PlAY</a>
                        {/* <button><i class="fas fa-plus fa-lg"></i> MY LIST</button> */}
                    </div>
                    <div className='movie-single__image'>
                        <img src={`http://image.tmdb.org/t/p/w500/${this.state.tv.backdrop_path}`} />
                    </div>
                </div>
            </div>
        )
    }
}

export default TVDetails