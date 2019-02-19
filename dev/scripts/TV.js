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
            <div className="wrapper">
                    <h2>Browse Tv Shows</h2>
                    <div className='movie-catalogue'>
                        {this.state.tv.map((tv, i) => {
                            return (
                                <div key={tv.id} className='movie-catalogue__movie'>
                                    
                                        <img src={`http://image.tmdb.org/t/p/w500/${tv.poster_path}`} />

                                        {/* {props.saved !== null && <button onClick={() =>
                                            props.onSave(props.tv)} className="icon-button saved-button"> {props.saved ? <i className="fas fa-check fa-lg icon"></i> : <i className="fas fa-plus fa-lg icon"></i>}
                                        </button>} */}
                                        {/* <span className="fa-stack fa-2x icon">
                                            <i className="far fa-circle fa-stack-2x"></i>
                                            <i className="fas fa-plus fa-stack-1x fa-inverse"></i>    
                                        </span> */}
                                    {/* <Link to={`/tv/${tv.id}`}>
                                        <div className='show-details'>
                                        <i className="fas fa-chevron-down fa-3x"></i>
                                       </div>
                                    </Link> */}
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

export default TV;