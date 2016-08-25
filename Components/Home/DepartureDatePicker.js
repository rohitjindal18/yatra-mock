import React from 'react';

class Rows extends React.Component {
	static DeparturePrice = ["4,212","4,222","4,232","4,252","4,216","4,212","4,211","4,214","4,522","4,672","4,000","6,212","7,212","4,212","4,112","4,219","4,218","4,212","4,672","4,212","4,672","4,345","4,212","4,222","4,212","7,552","4,672","5,212","4,878","4,612","4,412"];
	constructor(props) {
		super(props);
		this.state = {
			monthArray : [],
			selectedDate : ""
		}
	}
	componentWillReceiveProps() {
		var i = 0;
		var rowCount = 1;
		var completeArray = [];
		while(i < this.props.totalDays){
			var myArray = [];
			for(var j = 0 ; j<7;j++){
				var currentObj = {isActive : true , Value : "" , isToday : false , isSelected : false};
				if(rowCount == 1)
				{
					if( j >= this.props.startDay)
					{
						currentObj.Value = i+1;
						//myArray.push(i+1);
						i++;
					}
					else 
					{
						currentObj.Value = 0;
						//myArray.push(0);
					}
				}
				else {
					if((i) >= this.props.totalDays){
						currentObj.Value = 0;
						//myArray.push(0);
					}
					else {
						currentObj.Value = i+1;
						//myArray.push(i+1);
					}
					i++;
				}
				myArray.push(currentObj);
			}
			rowCount++;
			completeArray.push(myArray);
		}

		if(this.props.currentMonth == new Date().getMonth() & this.props.currentYear <= new Date().getFullYear()){
				var i = 1; 
				var rowCount = 0;
				for(var i = 0 ; i< completeArray.length ; i++){
					for(j = 0 ; j< 7;j++){
						if(completeArray[i][j].Value === new Date().getDate()){
							completeArray[i][j].isToday = true;
						}
						else if(completeArray[i][j].Value < new Date().getDate()) {
							completeArray[i][j].isActive = false;
						}
					}
				}
		}

		if(this.state.selectedDate.length > 0){
			var departYear = this.state.selectedDate.split('-')[0];
			var departMonth = this.state.selectedDate.split('-')[1];
			var departDate = this.state.selectedDate.split('-')[2];

			if(this.props.currentYear == departYear && this.props.currentMonth == departMonth-1){
				for(var i = 0 ; i< completeArray.length ; i++){
					for(j = 0 ; j< 7;j++){
							if(completeArray[i][j].Value == departDate){
								completeArray[i][j].isSelected = true;
							}
						}
					}
				}
			}

		this.setState({
			monthArray : completeArray
		});
	}
	hanldleClickDate(value) {
		this.setState({
			selectedDate : value
		});
		this.props.handleSelectDate(value);
	}
	render() {
		var component = this;
		var allData = (
			this.state.monthArray.map((elem , index) => {
				return(
					<tr key={index} className="trWeek">
						{
							elem.map((value , index) => {
								var ide = component.props.currentYear + "-"+(component.props.currentMonth+1)+"-"+value.Value;
								if(value.Value == 0){
									return(
										<td key={index} className="noBorder"></td>
									);
								}
								else {
									if(value.isActive){
										return(
											<td key={index} className={value.isActive?value.isToday?"dayTodayDiv":value.isSelected?"daySelectedDiv":"dayDiv":"inActiveDayDiv"} id={ide} onClick={value.isActive?component.hanldleClickDate.bind(this ,ide):null}>
												<div>{value.Value}</div>
												<div className="priceValue">{Rows.DeparturePrice[index]}</div>
											</td>
										);
									}
									else {
										return(
											<td key={index} className={value.isActive?value.isToday?"dayTodayDiv":value.isSelected?"daySelectedDiv":"dayDiv":"inActiveDayDiv"} id={ide} onClick={value.isActive?component.hanldleClickDate.bind(this ,ide):null}>
												<div>{value.Value}</div>
											</td>
										);
									}
								}
							})
						}
					</tr>
				);
			})
		);
		return(
			<tbody>
				{allData}
			</tbody>
		);
	}
}

export default class DepartureDatePicker extends React.Component {
	static monthValue = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"];
	static weekDays = ["SUN" , "MON" , "TUE"  ,"WED" ,"THU" , "FRI" , "SAT"];
	constructor(props) {
		super(props);
		this.state = {
			monthsName : [] ,
			currentMonth : -1,
			indexOfDay : -1,
			noOfDays : 0,
			currentYear : 0,
			selectedMonth : -1 ,
			isSelected : false
		}
	}

	componentWillMount(){
		var myArray = [];
		var monthVal = new Date().getMonth();
		for(var i =0 ; i <10 ; i++){
			var curretObj = {isSelected : false , Name : ""};
			if(monthVal > 11){
				curretObj.Name = DepartureDatePicker.monthValue[monthVal-12];
				curretObj.isSelected = false;
			}
			else {
				if(i == 0){
					curretObj.isSelected = true;
				}
				else {
					curretObj.isSelected = false;
				}
				curretObj.Name = DepartureDatePicker.monthValue[monthVal];
			}
			myArray.push(curretObj);
			monthVal++;
		}
		this.setState({
			monthsName : myArray,
			currentMonth : new Date().getMonth(),
			currentYear : new Date().getFullYear(),
			indexOfDay : new Date(new Date().getFullYear() , new Date().getMonth() , 1).getDay(),
			noOfDays : new Date(new Date().getFullYear() , (new Date().getMonth()) , 0).getDate()
		});
	}

	handleMonthClick(index) {
		var myArray = this.state.monthsName;
		myArray.map((elem) => {
			elem.isSelected = false;
		})
		myArray[index].isSelected = true;
		var year;
		if(DepartureDatePicker.monthValue.indexOf(this.state.monthsName[index].Name) < new Date().getMonth()){
			year = new Date().getFullYear() + 1;
		}
		else {
			year = new Date().getFullYear();
		}
		this.setState({
			monthsName : myArray,
			currentMonth : DepartureDatePicker.monthValue.indexOf(this.state.monthsName[index].Name),
			indexOfDay : new Date(year , (DepartureDatePicker.monthValue.indexOf(this.state.monthsName[index].Name)) , 1).getDay(),
			currentYear : year,
			noOfDays : new Date(year , (DepartureDatePicker.monthValue.indexOf(this.state.monthsName[index].Name))+1 , 0).getDate()
		},this.final);
	}

	final() {
		this.forceUpdate();
	}

	componentDidMount() {
		var count  = 0;
		for(var i = 0 ; i<(this.state.noOfDays - (7 - this.state.indexOfDay));i++){
			if((i+1) % 7 == 0){
				count++;
			}
		}
	}

	handleDepartureDateClick(date) {
		this.props.handleDepartDate(date);
	}
	render() {
		var component = this;
		var months = (
			this.state.monthsName.map((month , index) => {
				return(
					<li className={month.isSelected?"liSelectedDiv":"liDiv"} key={index} id ={index} onClick={component.handleMonthClick.bind(this , index)}>
						{month.Name}
					</li>
				);
			})
		);

		var weekDay = (
			DepartureDatePicker.weekDays.map((day , index) => {
				return(
					<th className="weekLiDiv" key={index}>
						{day}
					</th>
				);
			})
		);

		var dayRows = (		
				<Rows handleSelectDate={this.handleDepartureDateClick.bind(this)} totalDays={this.state.noOfDays} startDay={this.state.indexOfDay} currentYear={this.state.currentYear} currentMonth={this.state.currentMonth}/>
		);
		return(
			<div id="datePicker" style = {{'display':this.props.isEnabled}}>
				<div className="departHeader">
					Select Departure Date
				</div>
				<div className="dateDivPicker">
					<div className="monthDivPicker">
						<ul className="ulDiv">
							{months}
						</ul>
					</div>
					<div className="rightMonthDiv">
						<div className="weekHeader">
							<table>
								<tbody>
									<tr className="trWeek">
										{weekDay}
									</tr>
								</tbody>
							</table>
						</div>
						<br/>
						<div className="dayHeader">
							<table className="dayTableDiv">
									{dayRows}
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
};