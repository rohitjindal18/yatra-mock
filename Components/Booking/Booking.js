import React from 'react';
class ReviewBooking extends React.Component {
	render() {
		return(
			<div className="ReviewBookingClass">
				<div className="reviewHeader">
					Review Your Booking
				</div>
				<div className="Circle">
					<div className="sourceCircle">
						<strong>{this.props.state.appState.sourceCity}</strong>
					</div>
					<div className="planeCircle">
					</div>
					<div className="destinationCircle">
						<strong>{this.props.state.appState.destinationCity}</strong>
					</div>
				</div>
			</div>
		);
	}
}

class ReviewPrice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			flightPrice : 0,
			totalPrice : 0
		}
	}
	componentDidMount(){
		this.setState({
			flightPrice : this.props.state.appState.flights[this.props.state.appState.flightIndex].price,
			totalPrice : this.props.state.appState.flights[this.props.state.appState.flightIndex].price * 1
		});
	}
	render() {
		return(
			<div>
				<div className="priceHeader">
					Fare Details
				</div>
				<div>
					<div >
						<div style={{float:'left'}}>
							Adult x 1
						</div>
						<div style={{float:'right'}}>
							{this.state.flightPrice}
						</div>
					</div>
					<br/>
					<br/>
					<div style={{float:'right'}}>
						You Pay 
					</div>
					<br/>
					<div style={{float:'right',fontSize : '24px'}}>
						INR {this.state.totalPrice}
					</div>
				</div>
			</div>
		);
	}
}

class ReviewTravel extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		return(
			<div className="TravelBookingClass">
				<div className="travelHeader">
					Traveller Details
				</div>
			</div>
		);
	}
}

export default class Booking extends React.Component {
	constructor() {
		super();
		this.state = {
			currentbutton : 1,
			bgcolor : 'green' , 
			color : 'white'
		}
	}
	changeLayout() {
			this.setState({
				currentbutton : 1,
				bgcolor : 'white',
				color : 'green'
			} , this.forceUpdate());
	}

	render() {
		var reviewStyle = { backgroundColor: this.state.bgcolor  , color : this.state.color};
		var travellerStyle = { backgroundColor: this.state.color  , color : this.state.bgcolor};
		if(this.state.currentbutton == 0){
			return(
				<div>
					<div id="topDivConnect">
						<div id="leftConfirm">
							<div style={reviewStyle} className="reviewBooking">
							1
							</div>
							<div>
								Review
							</div>
						</div>
						<div>
							<hr id="horizontalBar"/>
						</div>
						<div>
							<div style={travellerStyle} className="reviewTraveller">
							2
							</div>
							<div>
								Travellers
							</div>
						</div>
					</div>
					<div id="subBookingDiv">
						<div id="reviewBook">
							<ReviewBooking {...this.props}/>
						</div>
						<div className="reviewPrice">
							<ReviewPrice {...this.props}/>
						</div>
					</div>
					<div className="continueButton" onClick={this.changeLayout.bind(this)}>
						Continue
					</div>
				</div>
			);
		}
		else {
			return(
				<div>
					<div id="topDivConnect">
						<div id="leftConfirm">
							<div style={reviewStyle} className="reviewBooking">
							1
							</div>
							<div>
								Review
							</div>
						</div>
						<div>
							<hr id="horizontalBar"/>
						</div>
						<div>
							<div style={travellerStyle}  className="reviewTraveller">
							2
							</div>
							<div>
								Travellers
							</div>
						</div>
					</div>
					<div id="subBookingDiv">
						<div id="reviewTravel">
							<ReviewTravel {...this.props}/>
						</div>
						<div className="reviewPrice">
							<ReviewPrice {...this.props}/>
						</div>
					</div>
				</div>
			);
		}
		
	}
} 