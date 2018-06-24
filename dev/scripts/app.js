import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import Movies from './Movies';
import TV from './TV';
import Search from './Search';
import MovieDetails from './MovieDetails';
import TVDetails from './TVDetails';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDbsRg8M2ZpKXy_iE-5MJ3-wnRsDP_fWQU",
    authDomain: "whats-on-app.firebaseapp.com",
    databaseURL: "https://whats-on-app.firebaseio.com",
    projectId: "whats-on-app",
    storageBucket: "whats-on-app.appspot.com",
    messagingSenderId: "1061872925185"
  };

  firebase.initializeApp(config);


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };

    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this.dbRef = firebase.database().ref('saved');

    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        // console.log(user);
        this.dbRef.on('value', (snapshot) => {
          // console.log(snapshot.val());
        });
        this.setState({
          loggedIn: true
        });
      }
      else {
        // console.log('user logged out');
        this.setState({
          loggedIn: false
        });
      }
    })
  }
  loginWithGoogle() {
    console.log('clicked');
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        console.log(user);
      })
      .catch(() => {
        console.log(err);
      });
  }

  logout() {
    firebase.auth().signOut();
    this.dbRef.off('value');
    console.log('Signed Out!');

  }

  render() {
    return (
      <Router>
        <div>
          <header className="top-header">
            <h1>What's On</h1>
            <nav>
              <Link to="/"> Movies </Link>
              <Link to="/TV"> TV Shows </Link>
              <Link to="/mylist"> My List </Link>
              <Link to="/search"> <i class="fas fa-search"></i> Discover </Link>
              <div className="signin-button">
                {this.state.loggedIn === false && <button onClick=
                {this.loginWithGoogle}>Sign In</button>}

                {this.state.loggedIn === true ? <button onClick={this.logout}
                >Sign Out</button> : null}
              </div>

            </nav>
          </header>
          <Route exact path="/" component={Movies} />
          <Route exact path="/movie/:movie_id" component={MovieDetails} />
          <Route exact path="/TV" component={TV} />
          <Route exact path="/tv/:tv_id" component={TVDetails} />
          <Route exact path="/Search" component={Search} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
