import React from 'react';
import FlightLists from './FlightLists.js';
import { browserHistory } from 'react-router';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class Flight extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isFirst : true,
			flightCount : 0,
			sourceCity : "",
			destinationCity : "",
			flights : [],
			flightIndex : -1
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

	shouldComponentUpdate() {
		if(this.state.isFirst){
			this.setState({
				isFirst : false
			});	
			return true;
		}
		else {
			return (this.state.flightCount !== this.props.state.appState.flights.length);
		}
	}

	componentDidUpdate() {
		this.setState({
			flightCount : this.props.state.appState.flights.length,
			flights : this.props.state.appState.flights
		});
	}

	bookFlight(index){
		console.log("rohit"+this);

		this.props.selectFlightIndex(index);
		browserHistory.push('/booking');
	}

	render(){
		var component = this;
		var flightLists = this.props.state.appState.flights.map(function(elem , index) {
			return (
					<FlightLists key={index} val={index} flightName={elem.flightName} flightPrice={elem.price} flightDeparture={elem.departTime} flightArrival={elem.arrivalTime} flightDuration={elem.duration} handleBookingFlight={component.bookFlight.bind(component)}/>
				);
		});
		return(
			<div>
				<div id="imageLeft">
					<img id="imgLeft" src="../../Images/image1.jpg"/>
				</div>
				<div id="imageRight">
					<img id="imgRight" src="../../Images/image2.jpg"/>
				</div>
				<div style={styles.flightMainDiv}>
					<div id="flightMainHeaderDiv" style={styles.flightMainHeaderDiv}>
						<span>You have successfully found {this.state.flightCount} flights</span>
					</div>
					<div id="divFlights">
						<ul>
							<li>
								Airline
							</li>
							<li>
								Depart
							</li>
							<li>
								Arrive
							</li>
							<li>
								Duration
							</li>
							<li>
								Price / Adult
							</li>
						</ul>
					</div>
					<ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
						{flightLists}
					</ReactCSSTransitionGroup>
				</div>
			</div>
		);
	}
}

var styles = {
	flightMainDiv : {
		marginLeft : 310,
		width: 800,
		height : 'auto',
		border : '2px solid #D4E5F5'
	},
	flightMainHeaderDiv : {
		backgroundColor : '#4EA5DF'
	}
};

export default Flight;