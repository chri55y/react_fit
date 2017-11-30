import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user:       {},     // initially empty
            loggedIn:   false
        }
    }

    componentDidMount() {
        if  ( window.location.hash ) {
            // window url has a hash
            let fitbitToken = window.location.hash.slice(1).split("&")[0].replace("access_token=","")
            console.log("Token: "+fitbitToken)

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
                        <h1 className="page-header">React Fit</h1>
                        <p className="lead">Your personal fitness dashboard:</p>
                    </header>
                </div>

                <div className="row text-center">
                    <a href="https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=228HFZ&redirect_uri=http%3A%2F%localhost%3A%2Ffitbit_auth&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800\n" >
                        Log in with fitbit
                    </a>
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