import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';  // for making ajax calls. axios is a promise base library
import LifetimeStats from './LifetimeStats';

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user:           {}    , // initially empty
            loggedIn:       false , // log in status > false means no
            lifetimeBest:   {}    , //
            lifetimeTotals: {}      //
        }
    }

    componentDidMount() {
        if  ( window.location.hash ) {
            // window url has a hash
            let fitbitToken = window.location.hash.slice(1).split("&")[0].replace("access_token=","")
            console.log("Token: "+fitbitToken)

            axios({
                method: 'get',
                url:    'https://api.fitbit.com/1/user/-/profile.json',
                headers: { 'Authorization': 'Bearer '+ fitbitToken },
                mode:   'cors'
            })
            .then(response => {
                console.log('\nprofile response object:')
                console.log(response)
                this.setState({user: response.data.user, loggedIn: true })
            })
                .catch(error => console.log(error))

            //this.setState({loggedIn: true })


            // https://api.fitbit.com/1/user/[user-id]/activities.json
            axios({
                method: 'get',
                url:    'https://api.fitbit.com/1/user/-/activities.json',
                headers: { 'Authorization': 'Bearer '+ fitbitToken },
                mode:   'cors'
            })
                .then(response => {
                    console.log('\nactivities response object:')
                    console.log(response)
                    // console.log('\tpre-state change\t' + response.data.best.total.steps.value)
                    this.setState({lifetimeBest: response.data.best.total, lifetimeTotals: response.data.lifetime.total })
                    // console.log('\tpost-state change\t' + this.state.lifetimeBest.steps.value)
                    // console.log(this.state)
                })
                .catch(error => console.log(error))

        }
    }

    //  CH 11-29-17
    //
    //  fitbit authentication : (there are some rubgems for doing this in rails, but not up-to-date, so ...)
    //      using client side authentication :
    //      > going directly to url
    //      > readinding auth. token from url hash param
    //
    //     implicit grant flow
    //
    //     more @: https://dev.fitbit.com/reference/web-api/oauth2/
    //
    //  <!-- need to change the following in URL below: client_id, redirect_uri -->
    render() {

        return (
            <div>
                <div className="container">
                    <header className="text-center">
                        <span className="pull-right">{this.state.user.displayName}</span>
                        <h1 className="page-header">React Fit</h1>
                        <p className="lead">Your personal fitness dashboard:</p>
                    </header>
                </div>

                {!this.state.loggedIn &&
                    <div className="row text-center">
                        <a href="https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=228HFZ&redirect_uri=http%3A%2F%localhost%3A%2Ffitbit_auth&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800\n">
                            Log in with fitbit
                        </a>
                    </div>
                }

                <div className="row">
                    <div className="col-lg-3">
                        {this.state.loggedIn &&
                        <LifetimeStats lifetimeTotals={this.state.lifetimeTotals} lifetimeBest={this.state.lifetimeBest} />
                        }
                        <div className="panel panel-default">
                            <div className="panel-heading"><h4>Badges</h4></div>
                            <div className="panel-body">
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">Steps</div>
                        </div>

                        <div className="panel panel-default">
                            <div className="panel-heading">Distance (miles)</div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-lg-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-heading">Your Friends</div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Dashboard  />,
        document.body.appendChild(document.createElement('div')),
    )
})