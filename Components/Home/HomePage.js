import React from 'react';
import { browserHistory } from 'react-router';
import DayPicker, { DateUtils } from "react-day-picker";
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class SearchDepartCityComponent extends React.Component {
	constructor(props){
		super(props);
	}
	handleCityClick(cityName) {
		this.props.clickedDepartCity(cityName);
	}
	render(){
		var cityHolder = [];
		var component = this;
		this.props.searchedCity.map(function(elem ,index) {
			cityHolder.push(<div key={index} className="indCity" onClick={component.handleCityClick.bind(component ,elem)}>{elem}</div>);
		});
		return(
			<div>
				{cityHolder}
			</div>
		);
	}
}

class SearchArrivalCityComponent extends React.Component {
	constructor(props){
		super(props);
	}
	handleCityClick(cityName) {
		this.props.clickedArrivalCity(cityName);
	}
	render(){
		var cityHolder = [];
		var component = this;
		this.props.searchedCity.map(function(elem ,index) {
			cityHolder.push(<div key={index} className="depCity" onClick={component.handleCityClick.bind(component ,elem)}>{elem}</div>);
		});
		return(
			<div>
				{cityHolder}
			</div>
		);
	}
}

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
			departYear : "",
			citiesArray : ["Bangalore (BLR)" , "Delhi (DEL)" , "Mumbai (MUM)" , "Pune (PUN)" , "Chennai (CHN)" , "Lucknow (LKO)","Chandigarh (CDH)" , "Goa (PJN)"],
			searchedCities : [],
			searchedDepCities : []
		};
	}

  	searchFlights() {
  		var sourceC = this.refs.sourceCity.value.split(' ')[0];
  		var destinationC = this.refs.destinationCity.value.split(' ')[0];
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

	    	if(day > this.state.selectedDay2 & this.state.arrivalDate.indexOf("Arrival") == -1){
	    		this.setState({
	    			selectedDay2 : day,
	    			arrivalDate : year+"-"+month+"-"+date
	    		});
	    	}
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
 		 return ((day < this.state.selectedDay));
	}

	currentDate(day){
		return ((day < new Date()));
	}

	searchDeparture() {
		if(this.refs.sourceCity.value == ""){
				this.setState({
					searchedCities : []
				});
		}
		else {
			var myArray = [];
			for(var i =0 ;i<this.state.citiesArray.length;i++){
				if(this.state.citiesArray[i].toLowerCase().indexOf(this.refs.sourceCity.value.toLowerCase()) != -1){
					myArray.push(this.state.citiesArray[i]);
				}
			}
			this.setState({
				searchedCities : myArray
			});
		}
	}

	searchArrival() {
		if(this.refs.destinationCity.value == ""){
				this.setState({
					searchedDepCities : []
				});
		}
		else {
			var myArray = [];
			for(var i =0 ;i<this.state.citiesArray.length;i++){
				if(this.state.citiesArray[i].toLowerCase().indexOf(this.refs.destinationCity.value.toLowerCase()) != -1){
					myArray.push(this.state.citiesArray[i]);
				}
			}
			this.setState({
				searchedDepCities : myArray
			});
		}
	}
	clickDepart(cityName) {
		this.refs.sourceCity.value = cityName;
		this.setState({
			searchedCities : []
		});
	}

	clickArrival(cityName) {
		this.refs.destinationCity.value = cityName;
		this.setState({
			searchedDepCities : []
		});
	}

	render() {
		var component = this;
		var departuredatePick = (
			<DayPicker 
				id="datePicker"
		 		style = {{'display':this.state.isEnabled}}
		 		disabledDays = {this.currentDate}
		        initialMonth={ new Date(new Date().getFullYear() , new Date().getMonth()) }
		        selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
		        onDayClick={ this.handleDayClick.bind(this) }
		    />
		);

		var arrivaldatePick = (
			<DayPicker 
				id="datePicker2"
		 		style = {{'display':this.state.isEnabled2}}
		 		disabledDays = {this.sunday.bind(component)}
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
						
					</div>
					<div style ={styles.bannerMiddleDiv}>
						<div style = {styles.bannerMiddleSubDiv}>
							<table style={styles.homeBannerTable}>
								<tbody>
									<tr>
										<td style={styles.homeBannerTdBig}>
											<input style={styles.input.homeBannerTdBig} onKeyUp={this.searchDeparture.bind(this)} type="text" placeholder="Select Origin" ref="sourceCity"></input>
										</td>
										<td style={styles.homeBannerTdBig}>
											<input style={styles.input.homeBannerTdBig} onKeyUp={this.searchArrival.bind(this)} type="text" placeholder="Select Destination" ref="destinationCity"></input>
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
							<div key={0} style ={styles.bannerFirst}>
								LOWEST FARE FINDER	
							</div>
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
						<div className="departCityDiv">
							<SearchDepartCityComponent clickedDepartCity={this.clickDepart.bind(this)} searchedCity={this.state.searchedCities}/>
						</div>
						<div className="arrivalCityDiv">
							<SearchArrivalCityComponent clickedArrivalCity={this.clickArrival.bind(this)} searchedCity={this.state.searchedDepCities}/>
						</div>
						{departuredatePick}
						{arrivaldatePick}
						<div id="longimage">
							<img id="imageDown" src="../../Images/image4.png"/>
						</div>
				</div>
			);
	}
}

var styles = {
	homePageBannerStyle : {
			width : '100%',
			top : 0,
			left : 0,
			position : 'absolute'
	},
	homePageBannerImage : {
		width : '100%',
		height : 450,
		opacity : 0.9
	},
	bannerMiddleDiv : {
		position : 'absolute',
		marginLeft : 200 ,
		marginTop : 100 ,
		width : 1000 , 
		height : 130,
		backgroundColor : '#282929',
		opacity : 0.9
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
			fontFamily : 'Optima',
			fontSize : 18,
			opacity : 1
		}
	},
	homeheading : {
		position : 'absolute',
		marginLeft : 200 ,
		marginTop : 80 ,
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
		marginTop : 320,
		width : '100%',
		height : 150 ,
		display : 'inline-flex'
	},
	bannerFirst : {
		marginLeft : 250,
		width : 190 ,
		height : 60 ,
		backgroundColor : 'black',
		color : 'orange',
		lineHeight: 4,
		textAlign : 'center',
		fontSize : 15,
		borderRadius : 15
	},
	bannerRest : {
		marginLeft : 50,
		width : 190 ,
		height : 60 ,
		backgroundColor : 'black',
		color : 'orange',
		lineHeight: 4,
		textAlign : 'center',
		fontSize : 15,
		borderRadius : 15
	}
};
