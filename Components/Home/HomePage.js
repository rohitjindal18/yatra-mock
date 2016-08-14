import React from 'react';
import { browserHistory } from 'react-router';
import DayPicker, { DateUtils } from "react-day-picker";
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


export default class HomePage extends React.Component {
	constructor(){
		super();
		this.state = {
			val : "",
			selectedDay: new Date(),
			selectedDay2: new Date(),
			isEnabled : 'none' ,
			isClicked : 0,
			isEnabled2 : 'none' ,
			isClicked2 : 0,
			departDate : "Departure",
			arrivalDate : "Arrival",
			isDepartSelected : false,
			departDay : "",
			departMonth : "",
			departYear : ""
		};
	}

  	searchFlights() {
  		var sourceC = this.refs.sourceCity.value;
  		var destinationC = this.refs.destinationCity.value;
  		var peopleC = this.refs.peopleCount.value;
  		this.props.flightSearchData(sourceC , destinationC , peopleC);
  		browserHistory.push('/flight');
  	}
  	enableDatePicker() {
  		if(this.state.isClicked === 0){
			this.setState({
		  			isEnabled : 'block',
		  			isClicked : 1
		  		});
  		}
  		else {
  			this.setState({
		  			isEnabled : 'none',
		  			isClicked : 0
		  		});
  		}
  	}

  	enableDatePicker2(){
  	 if(this.state.isDepartSelected){
  	 	if(this.state.isClicked2 === 0){
			this.setState({
		  			isEnabled2 : 'block',
		  			isClicked2 : 1
		  		});
  		}
  		else {
  			this.setState({
		  			isEnabled2 : 'none',
		  			isClicked2 : 0
		  		});
  		}
  	 }
  		
  	}

  	handleDayClick(e, day, { selected, disabled }) {
	    if (disabled) {
	      return;
	    }
	    console.log(day);
	    if (selected) {
	      	var date = day.getDate();
	   	 	var month = day.getMonth()+1;
	    	var year = day.getFullYear();
	    	this.setState({ selectedDay: null,
		    	departDate : year+"-"+month+"-"+date,
		      	isEnabled : 'none',
			  	isClicked : 0,
			  	departDay : date ,
			  	departMonth : month ,
			  	departYear : year
		    });
	    } else {
	      	var date = day.getDate();
	   	 	var month = day.getMonth()+1;
	    	var year = day.getFullYear();

		    this.setState({ selectedDay: day,
		    	departDate : year+"-"+month+"-"+date,
		      	isEnabled : 'none',
			  	isClicked : 0,
			  	isDepartSelected : true,
			  	departDay : date ,
			  	departMonth : month ,
			  	departYear : year
		    });
	    }
  	}

  	handleDayClick2(e, day, { selected, disabled }) {
	    if (disabled) {
	      return;
	    }
	    if (selected) {
	      	var date = day.getDate();
	   	 	var month = day.getMonth()+1;
	    	var year = day.getFullYear();
	    	this.setState({ selectedDay2: null,
		    	arrivalDate : year+"-"+month+"-"+date,
		      	isEnabled2 : 'none',
			  	isClicked2 : 0
		    });
	    } else {
	      	var date = day.getDate();
	   	 	var month = day.getMonth()+1;
	    	var year = day.getFullYear();

		    this.setState({ selectedDay2: day,
		    	arrivalDate : year+"-"+month+"-"+date,
		      	isEnabled2 : 'none',
			  	isClicked2 : 0
		    });
	    }
  	}

  	sunday(day) {
 		 return day.getDay() === 0;
	}

	render() {
		var departuredatePick = (
			<DayPicker 
				id="datePicker"
		 		style = {{'display':this.state.isEnabled}}
		        initialMonth={ new Date(2016, 7) }
		        selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
		        onDayClick={ this.handleDayClick.bind(this) }
		    />
		);

		var arrivaldatePick = (
			<DayPicker 
				id="datePicker2"
		 		style = {{'display':this.state.isEnabled2}}
		 		disabledDays = {this.sunday}
		        initialMonth={ new Date(this.state.departYear, this.state.departMonth-1) }
		        selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
		        onDayClick={ this.handleDayClick2.bind(this) }
		    />
		);

		var departureDate = (
			<span id="depDate">{this.state.departDate}</span>
		);

		var arrivalDate = (
			<span id="arrDate">{this.state.arrivalDate}</span>
		);
		return(
				<div style={styles.homePageBannerStyle}>
					<div style={styles.homePageBannerStyle}><img src="./Images/goldengate.jpg" style= {styles.homePageBannerImage}></img></div>
					<div style={styles.homeheading}>
						<div style={styles.flightsHeading}> 
							<strong>FLIGHTS</strong>
						</div>
						<div style={styles.busesHeading}>
							<strong>BUSES</strong>
						</div>
					</div>
					<div style ={styles.bannerMiddleDiv}>
						<div style = {styles.bannerMiddleSubDiv}>
							<table style={styles.homeBannerTable}>
								<tbody>
									<tr>
										<td style={styles.homeBannerTdBig}>
											<input style={styles.input.homeBannerTdBig} type="text" placeholder="Select Origin" ref="sourceCity"></input>
										</td>
										<td style={styles.homeBannerTdBig}>
											<input style={styles.input.homeBannerTdBig} type="text" placeholder="Select Destination" ref="destinationCity"></input>
										</td>
										<td style={styles.homeBannerTdBig} onClick={this.enableDatePicker.bind(this)}>
											{departureDate}
										</td>
										<td style={styles.homeBannerTdBig} onClick={this.enableDatePicker2.bind(this)}>
											 {arrivalDate}
										</td>
										<td style={styles.homeBannerTdBig}>
											<select className="travelCount" ref="peopleCount">
												<option>1</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
											</select>
										</td>
										<td id="searchTd" style={styles.homeBannerTdSmall} onClick={this.searchFlights.bind(this)}></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
						<div style = {styles.bottomBanners}>
							<ReactCSSTransitionGroup transitionName="another" transitionAppear={true} transitionAppearTimeout={1500} transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
							<div key={0} style ={styles.bannerFirst}>
								LOWEST FARE FINDER	
							</div>
							</ReactCSSTransitionGroup>
							<div key={1} style ={styles.bannerRest}>
							LOWEST FARE FINDER
								
							</div>
							<div key={2} style ={styles.bannerRest}>
							LOWEST FARE FINDER
								
							</div>
							<div key={3} style ={styles.bannerRest}>
							LOWEST FARE FINDER
								
							</div>

						</div>
						{departuredatePick}
						{arrivaldatePick}
				</div>

			);
	}
}

var styles = {
	homePageBannerStyle : {
			width : '100%',
			height : 550,
			top : 0,
			left : 0,
			position : 'absolute'
	},
	homePageBannerImage : {
		width : '100%',
		height : 550,
		opacity : 0.5
	},
	bannerMiddleDiv : {
		position : 'absolute',
		marginLeft : 200 ,
		marginTop : 200 ,
		width : 1000 , 
		height : 130,
		backgroundColor : '#282929',
		opacity : 0.8
	},
	bannerMiddleSubDiv : {
		width : 950,
		margin : 'auto',
		height : 44,
		marginTop : 50,
		backgroundColor : 'white',
		opacity : 1
	} ,
	homeBannerTable : {
		borderCollapse: 'collapse',
		borderRadius : 8,
		opacity : 1
	},
	homeBannerTdBig : {
		width : 177 ,
		height : 44 ,
		backgroundColor : 'white',
		border : '1px solid #282929',
		borderRadius : 8,
		overflow : 'hidden',
	} ,
	homeBannerTdSmall : {
		width : 65 ,
		height : 44,
		backgroundColor : '#4A90E2'
	},
	input : {
		homeBannerTdBig : {
			width : '100%',
			height : '100%',
			border : 'none',
			fontFamily : 'Proxima Regular',
			fontSize : 16,
			opacity : 1
		}
	},
	homeheading : {
		position : 'absolute',
		marginLeft : 200 ,
		marginTop : 180 ,
		width : 1000 , 
		height : 120 ,
		display : 'inline-flex'
	},
	flightsHeading : {
		width : 100,
		height : 80,
		color : 'black',
		opacity : 0.9,
		color : 'black'
	},
	busesHeading : {
		width : 100,
		height : 80,
		color : 'black',
		opacity : 0.9,
		color : 'black'
	},
	bottomBanners : {
		position : 'absolute',
		marginTop : 420,
		width : '100%',
		height : 150 ,
		display : 'inline-flex'
	},
	bannerFirst : {
		marginLeft : 150,
		width : 250 ,
		height : 120 ,
		backgroundColor : 'black',
		color : 'white',
		lineHeight: 7,
		textAlign : 'center'
	},
	bannerRest : {
		marginLeft : 50,
		width : 250 ,
		height : 120 ,
		backgroundColor : 'black',
		color : 'white',
		lineHeight: 7,
		textAlign : 'center'
	}
};
