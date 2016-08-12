import React from 'react';

class Flight extends React.Component {
	constructor(){
		super();
		this.state = {
			flightCount : 0,
			sourceCity : "",
			destinationCity : "",
			flights : []
		}
	}
	componentWillMount(){
		this.setState({
			sourceCity : this.props.state.appState.sourceCity,
			destinationCity : this.props.state.appState.destinationCity
		} , this.componentMount);	
	}

	componentMount() {
		this.props.searchFlight(this.state.sourceCity , this.state.destinationCity);
	}

	componentDidUpdate() {
		this.setState({
			flightCount : this.props.state.appState.flights.length,
			flights : this.props.state.appState.flights
		});
	}
	render(){
		var flightLists = this.props.state.appState.flights.map(function(elem) {
			return (
					<h1>rohit</h1>
				);
		});
		return(
			<div style={styles.flightMainDiv}>
				<div id="flightMainHeaderDiv" style={styles.flightMainHeaderDiv}>
					<span>You have successfully found {this.state.flightCount} flights</span>
				</div>
				{flightLists}
			</div>
		);
	}
}

var styles = {
	flightMainDiv : {
		marginLeft : 300,
		width: 800,
		height : 500,
		backgroundColor : '#F2F2F2'
	},
	flightMainHeaderDiv : {
		backgroundColor : '#D4E5F5'
	}
};

export default Flight;