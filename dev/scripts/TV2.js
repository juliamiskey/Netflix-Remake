import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class TV2 extends React.Component {
    constructor() {
        super();
        this.state = {
            tv: []
        }
    }
    componentDidMount() {
        axios({
            url: `https://api.themoviedb.org/3/discover/tv`,
            params: {
                api_key: `4596c01cc129c0cbf8d2d1ac4cf4b6fe`,
                language: `en-US`,
                sort_by: `popularity.desc`,
                page: `2`
            }
        })
            .then((res) => {
                this.setState({
                    tv: res.data.results
                });
            });
    }

    render() {
        return (
            <div>
                <h1>Browse Tv Shows</h1>
                <div className='movie-catalogue'>
                    {this.state.tv.map((tv, i) => {
                        return (
                            <div key={tv.id} className='movie-catalogue__movie'>
                                <Link to={`/tv/${tv.id}`}>
                                    <img src={`http://image.tmdb.org/t/p/w500/${tv.poster_path}`} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
          

            </div>
        )
    }
}

export default TV2