

<div className="panel panel-default">
    <div className="panel-heading"><h4>Lifetime Stats</h4></div>
    <div className="panel-body">
        <h4>Distance:</h4>
        <p>Total: {this.state.lifetimeTotals.distance}</p>
        {this.state.loggedIn &&
        <p>
            Best: {this.state.lifetimeBest.distance.value} on {this.state.lifetimeBest.distance.date}
        </p>
        }
        <h4>Steps:</h4>
        <p>Total: {this.state.lifetimeTotals.steps}</p>
        {this.state.loggedIn &&
        <p>
            Best: {this.state.lifetimeBest.steps.value} on {this.state.lifetimeBest.steps.date}
        </p>
        }
    </div>
</div>