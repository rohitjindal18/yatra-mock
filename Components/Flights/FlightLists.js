import React from 'react';

export default class FlightLists extends React.Component {
	bookFlight = (index) => {
		this.props.handleBookingFlight(index);
	}
	render() {
		return(
				<div id="flightListMainDiv">
						<div id="flightListTopDiv" key={this.props.val}>
							<ul>
								<li>
									{this.props.flightName}
								</li>
								<li>
									{this.props.flightDeparture}
								</li>
								<li>
									{this.props.flightArrival}
								</li>
								<li>
									{this.props.flightDuration}

								</li>
								<li>
									{this.props.flightPrice}
								</li>
								<li>
									<div id="bookflight" onClick={this.bookFlight.bind(null , this.props.val)}>
										Book Now
									</div>
								</li>
							</ul>
						</div>
					<div id="flightListBottomDiv">
						<ul>
							<li>
								FLIGHT DETAILS
							</li>
						</ul>
					</div>
				</div>
		);
	}
}	