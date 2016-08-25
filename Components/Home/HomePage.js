import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import DayPicker, { DateUtils } from "react-day-picker";
import {flightSearchData} from '../../actions/actionCreator.js';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import DepartureDatePicker from './DepartureDatePicker.js';
import ArrivalDatePicker from './ArrivalDatePicker.js';

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class SearchDepartCityComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentIndex : -1
		}
	}

	componentWillReceiveProps() {
		this.setState({
			currentIndex : this.props.isFocussed
		});
	}

	handleOnChange = (event , item , index) => {
		this.props.clickedDepartCity(item.props.primaryText.split(' ')[0]);
	}

	render(){
		var cityHolder = [];
		var component = this;
		this.props.searchedCity.map(function(elem ,index) {
				cityHolder.push(<MenuItem key={index} style={styless.menuBackColor} primaryText={elem} rightIcon={
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 5.31-1.42 4.35-1.16L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"/></svg>
				}/>);
		});
		return(
				<Menu disableAutoFocus={true} onItemTouchTap={this.handleOnChange.bind(this)} >
					{cityHolder}
				</Menu>
		);
	}
};

var styless = {
	menuBackColor : {
		backgroundColor : 'white'
	}
}

class SearchArrivalCityComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentIndex : -1
		}
	}
	
	componentWillReceiveProps() {
		this.setState({
			currentIndex : this.props.isFocussed
		});
	}

	handleOnChange = (event , item , index) => {
		this.props.clickedArrivalCity(item.props.primaryText.split(' ')[0]);
	}
	render(){
		var cityHolder = [];
		var component = this;
		this.props.searchedCity.map(function(elem ,index) {
			cityHolder.push(<MenuItem key={index} style={styless.menuBackColor} primaryText={elem} rightIcon={
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z"/></svg>
			}/>);
		});
		return(
			<Menu disableAutoFocus={true} onItemTouchTap={this.handleOnChange.bind(this)} >
				{cityHolder}
			</Menu>
		);
	}
};

var divStyles = {
	backColor : {
		backgroundColor : 'white'
	},
	backColor2 : {
		backgroundColor : 'silver'
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
			noOfPeople : 1,
			departDay : "",
			departMonth : "",
			departYear : "",
			citiesArray : ["Bangalore (BLR)" , "Delhi (DEL)" , "Mumbai (MUM)" , "Pune (PUN)" , "Chennai (CHN)" , "Lucknow (LKO)","Chandigarh (CDH)" , "Goa (PJN)"],
			searchedCities : [],
			searchedDepCities : [],
			currentFocusIndex : -1,
			currentFocusIndexD : -1,
			isRightPressed : false
		};
	}

  	searchFlights() {
  		var sourceC = this.refs.sourceCity.value.split(' ')[0];
  		var destinationC = this.refs.destinationCity.value.split(' ')[0];
  		var peopleC = this.state.noOfPeople;
  		this.props.dispatch(flightSearchData(sourceC , destinationC , peopleC));
  		//this.props.flightSearchData(sourceC , destinationC , peopleC);
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

	handleChange = (event , index , value) => {
		this.setState({
			noOfPeople : value
		});
	}
	clickArrival(cityName) {
		this.refs.destinationCity.value = cityName;
		this.setState({
			searchedDepCities : []
		});
	}

	keyPressed(event) {
		if(event.keyCode == 40){
			this.setState({
				currentFocusIndex : this.state.currentFocusIndex + 1
			});
		}
		else if(event.keyCode == 38){
			this.setState({
				currentFocusIndex : this.state.currentFocusIndex - 1
			});
		}
	}

	keyPressedD(event) {
		if(event.keyCode == 40){
			this.setState({
				currentFocusIndexD : this.state.currentFocusIndexD + 1
			});
		}
		else if(event.keyCode == 38){
			this.setState({
				currentFocusIndexD : this.state.currentFocusIndexD - 1
			});
		}
	}

	departureDateSelected(day){
		var date = new Date(day).getDate();
   	 	var month = new Date(day).getMonth()+1;
    	var year = new Date(day).getFullYear();

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

	arrivalDateSelected(day) {
			var date = new Date(day).getDate();
	   	 	var month = new Date(day).getMonth()+1;
	    	var year = new Date(day).getFullYear();

		    this.setState({ selectedDay2: day,
		    	arrivalDate : year+"-"+month+"-"+date,
		      	isEnabled2 : 'none',
			  	isClicked2 : 0
		    });
	}

	handleClickRightArrow() {
		this.setState({
			isRightPressed : true
		});
	}

	handleClickLeftArrow() {
		this.setState({
			isRightPressed : false
		});
	}

	render() {
		var component = this;
		var departuredatePick = (
		    <DepartureDatePicker handleDepartDate={this.departureDateSelected.bind(this)} isEnabled={this.state.isEnabled}/>
		);

		var arrivaldatePick = (
		    <ArrivalDatePicker departDateNew={this.state.departDate} handleArrivalDate={this.arrivalDateSelected.bind(this)} isEnabled={this.state.isEnabled2}/>
		);

		var departureDate = (
			<span id="depDate">{this.state.departDate}</span>
		);

		var arrivalDate = (
			<span id="arrDate">{this.state.arrivalDate}</span>
		);
		return(
				<div style={styles.homePageBannerStyle}>
						<div className="rightArrow" onClick={this.handleClickRightArrow.bind(this)}>
						</div>

						<div className="leftArrow" onClick={this.handleClickLeftArrow.bind(this)}>
						</div>
					<div style={styles.homePageBannerStyle}><img src="./Images/goldengate.jpg" style= {styles.homePageBannerImage}></img></div>
					<div style ={styles.bannerMiddleDiv}>
						<div style = {styles.bannerMiddleSubDiv}>
							<table style={styles.homeBannerTable}>
								<tbody>
									<tr>
										<td style={styles.homeBannerTdBig}>
											<input style={styles.input.homeBannerTdBig} onKeyDown={this.keyPressedD.bind(this)} onKeyUp={this.searchDeparture.bind(this)} type="text" placeholder="Select Origin" ref="sourceCity"></input>
										</td>
										<td style={styles.homeBannerTdBig}>
											<input style={styles.input.homeBannerTdBig} onKeyDown={this.keyPressed.bind(this)} onKeyUp={this.searchArrival.bind(this)} type="text" placeholder="Select Destination" ref="destinationCity"></input>
										</td>
										<td className="calendarCity" style={styles.homeBannerTdBig} onClick={this.enableDatePicker.bind(this)}>
											{departureDate}
										</td>
										<td className="calendarCity" style={styles.homeBannerTdBig} onClick={this.enableDatePicker2.bind(this)}>
											 {arrivalDate}
										</td>
										<td style={styles.homeBannerTdBigNew}>
											<DropDownMenu style={styles.customWidth} autoWidth={false} value={this.state.noOfPeople} onChange={this.handleChange}>
									          <MenuItem value={1} primaryText="1" />
									          <MenuItem value={2} primaryText="2" />
									          <MenuItem value={3} primaryText="3" />
									          <MenuItem value={4} primaryText="4" />
									          <MenuItem value={5} primaryText="5" />
									        </DropDownMenu>
										</td>
										<td id="searchTd" style={styles.homeBannerTdSmall} onClick={this.searchFlights.bind(this)}></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
						<div style={styles.insideBanner}>
						<div style = {styles.bottomBanners} className={this.state.isRightPressed?"rightTrans":"notTrans"}>
								<div className="bannerAllFirst" key={0} style ={styles.bannerFirst}>
									<div className="headerTab"><span>Lowest Fare Finder</span></div>
									<div className="headerSubTab"><span>Find the cheapeast fare for flights</span></div>
								</div>
								<div className="bannerAll" key={1} style ={styles.bannerRest}>
									<div className="headerTabNew"><span>Fares Starting 858</span></div>
									<div className="headerSubTabNew"><span>On Indigo , Spicejet & Jet Airways</span></div>
									<div className="headerSubSubTabNew"><span>Domestic Flights</span></div>
									<hr className="orangebar"/>
								</div>
								<div className="bannerAll" key={2} style ={styles.bannerRest}>
									<div className="headerTabNew"><span>Flat 55% off + use 10% ecash</span></div>
									<div className="headerSubTabNew"><span>Use code HAPPY50</span></div>
									<div className="headerSubSubTabNewBlue"><span>Domestic Hotels</span></div>
									<hr className="bluebar"/>
								</div>
								<div className="bannerAll" key={3} style ={styles.bannerRest}>
									<div className="headerTabNew"><span>Get up to 500 cashback</span></div>
									<div className="headerSubTabNew"><span>Through Paytm Wallet</span></div>
									<div className="headerSubSubTabNew"><span>Flights , Hotels & Bus</span></div>
									<hr className="orangebar"/>
								</div>
								<div className="bannerAll" key={4} style ={styles.bannerRest}>
									<div className="headerTabNew"><span>Europe Pacakges</span></div>
									<div className="headerSubTabNew"><span>starting @ 99,999/_</span></div>
									<div className="headerSubSubTabNewBlue"><span>International Holidays</span></div>
									<hr className="bluebar"/>
								</div>
								<div className="bannerAll" key={5} style ={styles.bannerRest}>
									<div className="headerTabNew"><span>Special 30% cashback</span></div>
									<div className="headerSubTabNew"><span>On International Flights</span></div>
									<div className="headerSubSubTabNew"><span>International Flights</span></div>
									<hr className="orangebar"/>
								</div>

							</div>
						</div>
						<div className="departCityDiv"  >
							<SearchDepartCityComponent isFocussed={this.state.currentFocusIndexD} clickedDepartCity={this.clickDepart.bind(this)} searchedCity={this.state.searchedCities}/>
						</div>
						<div className="arrivalCityDiv">
							<SearchArrivalCityComponent isFocussed={this.state.currentFocusIndex} clickedArrivalCity={this.clickArrival.bind(this)} searchedCity={this.state.searchedDepCities}/>
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
			position : 'absolute',
			overflow : 'hidden'
	},
	homePageBannerImage : {
		width : '100%',
		height : 450,
		opacity : 0.9
	},
	bannerMiddleDiv : {
		position : 'absolute',
		marginLeft : '15%' ,
		marginRight : '35%',
		marginTop : '8%' ,
		width : '70%' , 
		height : 130,
		backgroundColor : '#282929',
		opacity : 0.9
	},
	bannerMiddleSubDiv : {
		width : '90%',
		height : 44,
		marginTop : 50,
		marginLeft : '5%',
		backgroundColor : 'white',
		opacity : 1
	} ,
	homeBannerTable : {
		borderCollapse: 'collapse',
		opacity : 1
	},
	homeBannerTdBig : {
		width : 377 ,
		height : 44 ,
		backgroundColor : 'white',
		border : '1px solid #282929',
		
		overflow : 'hidden',
	} ,

	homeBannerTdBigNew : {
		width : 75 ,
		height : 44 ,
		backgroundColor : 'white',
		border : '1px solid #282929',
	
		overflow : 'hidden',
	},
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
			opacity : 1,
			outline : 'none'
		}
	},
	customWidth: {
   		 width: 75,
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
		width : '140%',
		height : 150 ,
		display : 'inline-flex',
		overflow : 'hidden'
	},
	insideBanner : {
		width : '100%'
	},
	bannerFirst : {
		marginLeft : '5%',
		width : '25%' ,
		height : 110 ,
		lineHeight: 4,
		textAlign : 'center',
		fontSize : 15
	},
	bannerRest : {
		marginLeft : '2%',
		width : '25%' ,
		height : 110 ,
		lineHeight: 4,
		textAlign : 'center',
		fontSize : 15
	}
};
