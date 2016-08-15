import React from 'react';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
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
			totalPrice : 0,
			travellerCount : 0
		}
	}
	componentDidMount(){
		this.setState({
			flightPrice : this.props.state.appState.flights[this.props.state.appState.flightIndex].price,
			totalPrice : this.props.state.appState.flights[this.props.state.appState.flightIndex].price * this.props.state.appState.travellerCount,
			travellerCount : this.props.state.appState.travellerCount
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
							Adult x {this.state.travellerCount}
						</div>
						<div style={{float:'right',paddingRight : '10px'}}>
							{this.state.flightPrice}
						</div>
					</div>
					<br/>
					<br/>
					<div style={{float:'right',paddingRight : '10px','fontFamily':'Optima'}}>
						You Pay 
					</div>
					<br/>
					<div id="inrdiv" style={{float:'right',marginRight:'-50px',fontSize : '24px','fontFamily':'Optima'}}>
						{this.state.totalPrice}
					</div>
				</div>
			</div>
		);
	}
}

class TravelDetail extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		var travelHolder = [];
		for(var i =0 ;i<this.props.state.appState.travellerCount;i++){
			travelHolder.push(
				<div key={i}>
					<div className="travelInput">
						<div className="adultSpan">Adult {i+1}</div>
						<div className="adultSpan2">
							<input type="text" placeholder="First Name" className="inputClass"></input>
						</div>&nbsp;&nbsp;&nbsp;&nbsp;
						<div className="adultSpan2">
							<input type="text" placeholder="Middle Name" className="inputClass"></input>
						</div>&nbsp;&nbsp;&nbsp;&nbsp;
						<div className="adultSpan2">
							<input type="text" placeholder="Last Name" className="inputClass"></input>
						</div>
					</div>
				</div>
			);
		}
		return(
			<div>
				<ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500} >
				{travelHolder}
				</ReactCSSTransitionGroup>
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
				<div className="adultDetails">
					<TravelDetail {...this.props}/>
				</div>
			</div>
		);
	}
}

export default class Booking extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentbutton : 0,
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
	componentDidMount() {
	//	this.refs.imageDiv.src = "../../Images/twopeople.png";
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
					<div className="continueButton" onClick={this.changeLayout.bind(this)}>
						Confirm Booking
					</div>

				</div>
			);
		}
		
	}
} 