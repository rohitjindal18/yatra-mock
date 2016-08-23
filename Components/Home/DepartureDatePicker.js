import React from 'react';

class Rows extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monthArray : []
		}
	}
	componentWillReceiveProps() {
		var i = 0;
		var rowCount = 1;
		var completeArray = [];
		while(i < this.props.totalDays){
			var myArray = [];
			for(var j = 0 ; j<7;j++){
				var currentObj = {isActive : true , Value : ""};
				if(rowCount == 1)
				{
					if( j >= this.props.startDay)
					{
						myArray.push(i+1);
						i++;
					}
					else 
					{
						myArray.push(0);
					}
				}
				else {
					if((i) >= this.props.totalDays){
						myArray.push(0);
					}
					else {
						myArray.push(i+1);
					}
					i++;
				}
			}
			rowCount++;
			completeArray.push(myArray);
		}

		this.setState({
			monthArray : completeArray
		});
	}
	hanldleClickDate(event) {
		console.log(event.target.id);
		this.props.handleSelectDate(event.target.id);
	}
	render() {
		var component = this;
		var allData = (
			this.state.monthArray.map((elem , index) => {
				return(
					<tr key={index} className="trWeek">
						{
							elem.map((value , index) => {
								var ide = component.props.currentYear + "-"+(component.props.currentMonth+1)+"-"+value;
								if(value == 0){
									return(
										<td key={index} className="noBorder"></td>
									);
								}
								else {
									return(
										<td key={index} className="dayDiv" id={ide} onClick={true?component.hanldleClickDate.bind(this):null}>{value}</td>
									);
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
			indexOfDay : new Date(new Date().getFullYear() , new Date().getMonth() , new Date().getDay()).getDay(),
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