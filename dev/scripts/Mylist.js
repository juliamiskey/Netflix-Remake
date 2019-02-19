import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Mylist extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            TVSaved: [],
            MoviesSaved: []
        }

        this.saveTV = this.saveTV.bind(this);
        this.saveMovie = this.saveMovie.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user !== null) {
                this.setState({
                    loggedIn: true,
                    user: user.uid,
                    userName: user.displayName,
                    userPhoto: user.photoURL
                });
                this.dbRef = firebase.database().ref(`users/${this.state.user}`);
                this.dbRef.on("value", snapshot => {
                    if (snapshot.val().TVSaved) {
                        this.setState({
                            TVSaved: Object.values(snapshot.val().TVSaved)
                        });

                        if (snapshot.val().MoviesSaved) {
                            this.setState({
                                MoviesSaved: Object.values(snapshot.val().MoviesSaved)
                            });
                        }
                    } else {
                        this.setState({
                            loggedIn: false
                        });
                    }
                });
            }
        });
    }
// HERE
    saveJob(jobObject) {
        const jobkey = jobObject.jobkey;
        // get currently saved jobs from state
        let jobsSaved = this.state.jobsSaved;

        // if job has been saved, remove saved job
        if (jobsSaved[jobkey]) {
            delete jobsSaved[jobkey];
        }
        // if job has not been saved, add job to saved jobs
        else {
            jobsSaved[jobkey] = jobObject;
        }
        // set state
        this.setState({
            jobsSaved: jobsSaved
        });

        if (this.state.loggedIn && this.state.user !== null) {
            this.dbRef = firebase
                .database()
                .ref(`users/${this.state.user}/jobsSaved`);
            this.dbRef.set(jobsSaved);
        }
    }

    applyForJob(jobObject) {
        const jobkey = jobObject.jobkey;
        let appliedFor = this.state.jobsAppliedFor;
        appliedFor[jobkey] = jobObject;

        let currentDate = new Date();
        currentDate = currentDate.toString();
        currentDate = currentDate.substring(0, 15);
        appliedFor[jobkey].dateApplied = currentDate;

        let saved = this.state.jobsSaved;
        if (saved[jobkey]) {
            saved[jobkey] = jobObject;
            saved[jobkey].dateApplied = currentDate;
        }

        // update state
        this.setState({
            jobsAppliedFor: appliedFor,
            jobsSaved: saved
        });

        // update database
        if (this.state.loggedIn && this.state.user !== null) {
            this.dbRef = firebase
                .database()
                .ref(`users/${this.state.user}/jobsAppliedFor`);
            this.dbRef.set(appliedFor);
            this.dbRefB = firebase
                .database()
                .ref(`users/${this.state.user}/jobsSaved`);
            this.dbRefB.set(saved);
        }
    }
    render() {
        return (
            <div className="wrapper">
                <h2>My List</h2>
                <div className="saved-results">
                    <Link to="/notes"><img src="/dev/styles/assets/edit-black.svg" alt="add notes" className="notes-button" /></Link>
                    {this.state.jobsSaved.map((job) => {
                        return (
                            <JobSearchResults
                                key={`saved-${job.jobkey}`}
                                job={job}
                                loggedIn={this.state.loggedIn}
                                onSave={this.saveJob}
                                onApply={this.applyForJob}
                                saved={null}
                                applied={null}
                            />
                        )
                    })}

                </div>
            </div>
        )
    }
}

export default Mylist;