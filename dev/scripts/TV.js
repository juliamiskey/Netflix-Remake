import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import TV2 from 'TV2';
import { Link } from 'react-router-dom';

class TV extends React.Component {
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
                page: `1`
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
            // <Router>
                <div>
                    <h1>Browse Tv Shows</h1>
                    <div className='movie-catalogue'>
                        {this.state.tv.map((tv, i) => {
                            return (
                                <div key={tv.id} className='movie-catalogue__movie'>
                                    <Link to={`/tv/${tv.id}`}>
                                        <img src={`http://image.tmdb.org/t/p/w500/${tv.poster_path}`} />

                                        {/* {props.saved !== null && <button onClick={() =>
                                            props.onSave(props.tv)} className="icon-button saved-button"> {props.saved ? <i class="fas fa-check fa-lg icon"></i> : <i class="fas fa-plus fa-lg icon"></i>}
                                        </button>} */}
                                        <i class="fas fa-plus fa-lg icon"></i>
                                    
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    {/* <Link to="/TV2"> Next Page </Link>
                    <Route exact path="/TV2" component={TV2} /> */}
                </div>
            // </Router>
        )
    }
}

export default TV